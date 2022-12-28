import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import millify from "millify";
import DefaultImage from "../../public/assets/house.jpg";
//React Icons
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

const Property = ({ property }) => {
  return (
    //passHref - forces Link to send the href property to its child. Defaults to false
    <Link href={`/property/${property.externalID}`} passHref>
      <Flex
        flexWrap="wrap"
        w="420px"
        p="5"
        paddingTop="0px"
        justifyContent="flex-start"
        cursor="pointer"
      >
        <Box>
          <Image
            src={property.coverPhoto ? property.coverPhoto.url : DefaultImage}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "400px", height: "260px" }}
            alt="/"
          />
        </Box>
        <Box w="full">
          <Flex
            paddingTop="2"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <Box paddingRight="3" color="green.400">
                {property.isVerified && <GoVerified />}
              </Box>
              <Text fontWeight="bold" fontSize="lg">
                AED {millify(property.price)}
                {property.rentFrequency && `/${property.rentFrequency}`}
              </Text>
            </Flex>

            <Avatar size="sm" src={property.agency?.logo?.url} />
          </Flex>
          <Flex
            alignItems="center"
            p="1"
            justifyContent="space-between"
            w="250px"
            color="blue.400"
          >
            {property.rooms}
            <FaBed /> | {property.baths} <FaBath /> | {millify(property.area)}{" "}
            sqft <BsGridFill />
          </Flex>
          <Text fontSize="lg">
            {property.title.length > 30
              ? property.title.substring(0, 30) + "..."
              : property.title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;
