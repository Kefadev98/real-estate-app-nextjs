import React from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
//Internal imports
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

const ImageScrollbar = ({ data }) => {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hidden" }}
    >
      {/*I left the mapping in this component, because there is not much code*/}
      {data.map((item) => (
        <Box
          key={item.id}
          width="910px"
          itemId={item.id}
          overflow="hidden"
          p="1"
        >
          <Image
            placeholder="blur"
            blurDataURL={item.url}
            src={item.url}
            width={1000}
            height={500}
            sizes="(max-width:500px) 100px, (max-width): 1023px 400px, 1000px"
            alt="property"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default ImageScrollbar;
