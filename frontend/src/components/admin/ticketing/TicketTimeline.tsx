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
  resolution: string;
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
      <div className='py-6 px-4 text-sm text-center italic text-gray-500 dark:text-slate-400 mt-4'>
        Loading ticket history...
      </div>
    );
  }

  return (
    <div className='py-6 px-4 mt-6 border-t border-slate-200 dark:border-slate-800 pt-4 max-h-80 overflow-y-auto'>
      <h3 className='text-sm font-semibold mb-4 text-slate-900 dark:text-slate-200'>
        Ticket History
      </h3>
      <div className='space-y-6'>
        {timeline.map((item, index) => (
          <div key={index} className='flex gap-3'>
            {/* Timeline Connector */}
            <div className='flex flex-col items-center'>
              <div className='w-3 h-3 bg-blue-500 rounded-full mt-1 ring-4 ring-white dark:ring-slate-900'></div>
              {index !== timeline.length - 1 && (
                <div className='flex-1 w-px bg-slate-200 dark:bg-slate-700 mt-1'></div>
              )}
            </div>

            <div className='text-sm flex-1'>
              <div className='font-medium text-slate-800 dark:text-slate-200'>
                {item.event}
              </div>

              {item.changes.length > 0 && (
                <div className='mt-2 space-y-2'>
                  {item.changes.map((change, i) => {
                    // Specialized rendering for Resolution field
                    if (change.field === 'resolution' && change.newValue) {
                      return (
                        <div key={i} className='bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg p-3 my-2'>
                          <span className='text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block mb-1'>
                            Resolution Note
                          </span>
                          <p className='text-slate-700 dark:text-slate-300 text-xs italic'>
                            {change.newValue}
                          </p>
                        </div>
                      );
                    }

                    // Standard change rendering
                    return (
                      <div key={i} className='flex items-center gap-2 text-slate-600 dark:text-slate-400 ml-1'>
                        <span className='w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full'></span>
                        <span className='font-medium text-slate-700 dark:text-slate-300 capitalize'>
                          {change.field}:
                        </span>
                        <span className='line-through text-red-500/80 dark:text-red-400/70 text-[11px]'>
                          {change.oldValue || 'none'}
                        </span>
                        <span className='text-slate-400'>→</span>
                        <span className='text-green-600 dark:text-green-400 font-medium'>
                          {change.newValue}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className='text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium uppercase tracking-tight'>
                {new Date(item.time).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </div>
            </div>
          </div>
        ))}

        {timeline.length === 0 && (
          <div className='text-center py-4 text-slate-400 dark:text-slate-600 text-xs'>
            No history recorded for this ticket yet.
          </div>
        )}
      </div>
    </div>
  );
}