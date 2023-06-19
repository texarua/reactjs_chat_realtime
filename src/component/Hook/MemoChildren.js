import { memo, useState } from "react"

function MemoChildren() {

    console.log(`render ....`)

    return (
        <>
            <div>
                <h1></h1>
            </div>
        </>
    )
}

export default memo(MemoChildren)