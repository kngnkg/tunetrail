import Link from "next/link"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type MenuTab = {
  label: string
  value: string
  href: string
}

interface MenuTabsProps {
  tabs: MenuTab[]
  defaultValue?: string
  className?: string
}

export const MenuTabs: React.FC<MenuTabsProps> = ({
  tabs,
  defaultValue,
  className,
}) => {
  return (
    <Tabs
      defaultValue={defaultValue ? defaultValue : tabs[0].value}
      className="sm:w-4/6 mx-auto"
    >
      <TabsList className="bg-transparent dark:bg-transparent">
        {tabs.map((tab, idx) => (
          <span key={idx}>
            <Link href={tab.href}>
              <TabsTrigger
                value={tab.value}
                className={
                  "data-[state=active]:border-b-4 border-primary dark:border-primary rounded-none focus-visible:ring-none"
                }
              >
                {tab.label}
              </TabsTrigger>
            </Link>
          </span>
        ))}
      </TabsList>
    </Tabs>
  )
}
