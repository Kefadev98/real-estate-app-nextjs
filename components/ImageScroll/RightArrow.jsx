import { useContext } from "react";
import { Icon, Flex } from "@chakra-ui/react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleRight } from "react-icons/fa";

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

export default RightArrow;
