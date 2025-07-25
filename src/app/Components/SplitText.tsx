"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

export default function SplitText() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return
            containerRef.current.style.visibility = "visible"

            const findSpan = containerRef.current.querySelector<HTMLElement>(".text-find");
            const restSpan = containerRef.current.querySelector<HTMLElement>(".text-rest");

            if (!findSpan || !restSpan) return;

            const { words: findWords } = splitText(findSpan);
            const { words: restWords } = splitText(restSpan);

            const allWords = [...findWords, ...restWords];

            animate(
                allWords,
                { opacity: [0, 1], y: [10, 0] },
                {
                    type: "spring",
                    duration: 1.5,
                    bounce: 0,
                    delay: stagger(0.05),
                }
            )
        })
    }, [])

    return (
        <div className="container" ref={containerRef}>
            <h1 className="h1">
                <span className="text-find">Find</span>
                <span className="text-rest"> your movie</span>
            </h1>
            <Stylesheet />
        </div>
    )
}

function Stylesheet() {
    return (
        <style>{`
            .container {
                display: flex;
                justify-content: left;
                align-items: left;
                max-width: 100%;
                text-align: left;
                visibility: hidden;
            }

            .split-word {
                will-change: transform, opacity;
                font-size: 3.125rem;
                line-height: 100%;
                font-weight: 900;
                display: inline-block;
            }

            .text-find .split-word {
                color: #FF0000;
            }

            .text-rest .split-word {
                color: white;
            }
        `}</style>
    )
}