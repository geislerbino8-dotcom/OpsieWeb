
import WhatWeDoS2CMS from "./sections/WhatWeDoS2CMS";
import WhatWeDoHeroCMS from "./sections/WhatWeDHeroCMS";


const WhatWeDoContent: React.FC = () => {
 
  return (
    <div className="w-full flex flex-col  ">
        <WhatWeDoHeroCMS />
        <WhatWeDoS2CMS />
    </div>
  );
};

export default WhatWeDoContent;