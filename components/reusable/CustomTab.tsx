"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabItem {
  name: string;
  value: string;
  content: React.ReactNode;
}

interface ReusableTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
}

const CustomTabs: React.FC<ReusableTabsProps> = ({ tabs = [], defaultValue, className }) => {
  const defaultTab = defaultValue || (tabs.length > 0 ? tabs[0].value : '');
  
  return (
    <div className={`w-full ${className || ''}`}>
      <Tabs defaultValue={defaultTab} className='w-full'>
        <TabsList className='bg-transparent border-b border-neutral-200 dark:border-neutral-800 rounded-none p-0 h-auto gap-1'>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='relative bg-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-500 data-[state=active]:shadow-none px-4 py-3 rounded-none border-0 font-medium text-sm transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-600 dark:after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300'
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent 
            key={tab.value} 
            value={tab.value}
            className='mt-6 animate-in fade-in-50 duration-300'
          >
            <div className='text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed'>
              {tab.content}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CustomTabs;