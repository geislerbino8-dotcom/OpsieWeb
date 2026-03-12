import { useEffect, useState } from 'react';
import { getTicketTimeline } from '../../../api/getTicketTimeline';

interface Change {
  field: string;
  oldValue: string;
  newValue: string;
}

interface TimelineItem {
  event: string;
  time: string;
  changes: Change[];
}

interface Props {
  ticketId: string;
}

export default function TicketTimeline({ ticketId }: Props) {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await getTicketTimeline(ticketId);
        setTimeline(data);
      } catch (error) {
        console.error('Failed to load timeline');
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [ticketId]);

  if (loading) {
    return (
      <div className='py-6 px-4 text-sm text-center italic text-gray-500 mt-4'>
        Loading ticket history...
      </div>
    );
  }

  return (
    <div className='py-6 px-4 mt-6 border-t pt-4 max-h-72 overflow-y-auto'>
      <h3 className='text-sm font-semibold mb-4'>
        Ticket History
      </h3>
      <div className='space-y-6'>
        {timeline.map((item, index) => (
          <div key={index} className='flex gap-3'>
            <div className='flex flex-col items-center'>
              <div className='w-3 h-3 bg-blue-500 rounded-full mt-1'></div>
              <div className='flex-1 w-px bg-gray-300'></div>
            </div>

            <div className='text-sm'>
              <div className='font-medium text-gray-800'>
                {item.event}
              </div>
              {item.changes.length > 0 && (
                <ul className='mt-2 ml-4 space-y-1 text-gray-600 list-disc'>
                  {item.changes.map((change, i) => (
                    <li key={i}>
                      <span className='font-medium'>
                        {change.field}
                      </span>{' '}

                      <span className='text-red-500'>
                        {change.oldValue}
                      </span>

                      {' → '}

                      <span className='text-green-600'>
                        {change.newValue}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className='text-xs text-gray-400 mt-1'>
                {new Date(item.time).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}