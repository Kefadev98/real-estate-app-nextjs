import { useContext } from "react";
import { Icon, Flex } from "@chakra-ui/react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

export default LeftArrow;
