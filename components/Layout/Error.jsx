import React from "react";
import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";
//Internal imports
import noresult from "../../public/assets/noresult.svg";

const Error = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      marginTop="5"
      marginBottom="5"
    >
      <Image src={noresult} alt="no result" />
      <Text fontSize="2xl" marginTop="3">
        No Results Found
      </Text>
    </Flex>
  );
};

export default Error;
