import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { BookOpenCheck } from "lucide-react"
import { Input } from "../ui/input"

  export function KnowledgeBaseContent({className}:{[key:string]:any}) {
    return (
        <div className={className}>
            <h1 className="mb-4 font-bold text-xl">Knowledge Base</h1>
            <Input  type="text" placeholder="Search" className="rounded-3xl mb-4 w-full md:w-1/3 md:max-w-[300px] min-w-[200px]"/>
            
             <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex gap-3 ">    <span> <BookOpenCheck width={"30px"} className="inline"/> Is it accessible?</span></AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        </div>
     
    )
  }
  