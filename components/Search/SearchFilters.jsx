import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
//Internal imports
import { filterData, getFilterValues } from "../../utils/filterData";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import noresult from "../../public/assets/noresult.svg";

const SearchFilters = () => {
  const router = useRouter();

  //This state is equal to the filterData from Utils and we can loop over that data
  const [filters, setFilters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");

  const [locationData, setLocationData] = useState();

  //Once we click a button an input is going to show up
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);

  {
    /*Once we pass the value, we have to update the state right here,
we can do that by updating URL, when we set up all properties from filters, 
we are able to update url*/
  }
  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);

    {
      /*We are checking if there is a specific item,
   we want to add to our query, we are not adding all of them*/
    }
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);
  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {/*I filtered select options from Filter Data*/}
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            w="fit-content"
            p="2"
            placeholder={filter.placeholder}
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {/*In this case i filtered items from Filter Data where we can see options for sale or rent*/}
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir="column">
        {/*Once we click on this button,the locations  will appear*/}
        <Button
          onClick={() => setShowLocations(!showLocations)}
          border="1px"
          borderColor="gray.200"
          marginTop="2"
        >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir="column" pos="relative" paddingTop="2">
            {/*In this input we can type searchTerm for location*/}
            <Input
              placeholder="Type Here"
              value={searchTerm}
              w="300px"
              focusBorderColor="gray.300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/*If searchTerm isn't empty, we can see little X button*/}
            {searchTerm !== "" && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor="pointer"
                right="5"
                top="5"
                zIndex="100"
                onClick={() => setSearchTerm("")}
              />
            )}
            {loading && <Spinner margin="auto" marginTop="3" />}
            {showLocations && (
              <Box height="300px" overflow="auto">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      p="2"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    marginTop="5"
                    marginBottom="5"
                  >
                    <Image src={noresult} />
                    <Text fontSize="xl" marginTop="3">
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilters;
