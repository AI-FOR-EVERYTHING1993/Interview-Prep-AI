import { getTechLogos } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; 

const   DisplayTechIcons = async ({ techStack }: TechIconProps) => {
    const techStackIcons = await getTechLogos(techStack);

    return (
        <div className="flex flex-row">
            {techStackIcons.slice(0, 4).map(({ tech, url }, index) => (
                <div key={tech} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && "-ml-3")}>
                    <span className="tech-tooltip">
                        {tech}
                    </span>
                    <Image src={url} alt={tech} width={102} height={102} className="size-5"/>
                </div>
            ))}
        </div>
    );
}

export default DisplayTechIcons;