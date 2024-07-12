import dynamic from "next/dynamic";
import React from "react";

const NoSSR: React.FC<React.PropsWithChildren> = (props) => (
    <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
});
