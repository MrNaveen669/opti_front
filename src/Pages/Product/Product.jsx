import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Box, 
  Text, 
  Spinner, 
  Flex, 
  Heading, 
  Select, 
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
  Grid,
  Badge
} from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { PRODUCT_ALL_URL } from "../../config/api"; 

const Product = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter states
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    gender: "",
    frameMaterial: "",
    priceRange: [0, 10000], // Default price range
    sort: "recommended"
  });

  // Available filter options (will be populated from products)
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    subCategories: [],
    genders: [],
    frameMaterials: []
  });

  useEffect(() => {
    // Parse query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const urlFilters = {};
    
    // Update filters based on URL parameters
    if (queryParams.get("category")) urlFilters.category = queryParams.get("category");
    if (queryParams.get("subCategory")) urlFilters.subCategory = queryParams.get("subCategory");
    if (queryParams.get("gender")) urlFilters.gender = queryParams.get("gender");
    if (queryParams.get("frameMaterial")) urlFilters.frameMaterial = queryParams.get("frameMaterial");
    if (queryParams.get("sort")) urlFilters.sort = queryParams.get("sort");
    
    // Set initial filters from URL
    if (Object.keys(urlFilters).length > 0) {
      setFilters(prev => ({ ...prev, ...urlFilters }));
    }

    const fetchProducts = async () => {
      try {
      
const response = await fetch(PRODUCT_ALL_URL);
        if (!response.ok) throw new Error("Failed to fetch products.");
        
        const data = await response.json();
        setProducts(data);
        
        // Extract available filter options from products
        const categories = [...new Set(data.map(product => product.category))];
        const subCategories = [...new Set(data.map(product => product.subCategory).filter(Boolean))];
        const genders = [...new Set(data.map(product => product.gender).filter(Boolean))];
        const frameMaterials = [...new Set(data.map(product => product.frameMaterial).filter(Boolean))];
        
        setFilterOptions({
          categories,
          subCategories,
          genders,
          frameMaterials
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  // Apply filters whenever products or filters change
  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      // Apply category filter
      if (filters.category) {
        result = result.filter(product => product.category === filters.category);
      }
      
      // Apply subCategory filter
      if (filters.subCategory) {
        result = result.filter(product => product.subCategory === filters.subCategory);
      }
      
      // Apply gender filter
      if (filters.gender) {
        result = result.filter(product => product.gender === filters.gender);
      }
      
      // Apply frameMaterial filter
      if (filters.frameMaterial) {
        result = result.filter(product => 
          product.frameMaterial && product.frameMaterial.includes(filters.frameMaterial)
        );
      }
      
      // Apply price range filter
      result = result.filter(product => {
        const price = parseFloat(product.price);
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });
      
      // Apply sorting
      if (filters.sort === "priceLowToHigh") {
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (filters.sort === "priceHighToLow") {
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      } else if (filters.sort === "newest") {
        // Assuming newer products have higher IDs or some timestamp
        // This is just an example, adjust according to your data
        result.sort((a, b) => b._id.localeCompare(a._id));
      } else if (filters.sort === "popular") {
        // Sort by popularity if you have such data
        // For now, random order for demonstration
        result.sort(() => Math.random() - 0.5);
      }
      
      setFilteredProducts(result);
    }
  }, [products, filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      subCategory: "",
      gender: "",
      frameMaterial: "",
      priceRange: [0, 10000],
      sort: "recommended"
    });
  };

  // Get active filter count
  const activeFilterCount = Object.keys(filters).filter(key => 
    key !== 'sort' && 
    key !== 'priceRange' && 
    filters[key]
  ).length;

  return (
    <Box p="20px">
      <Heading size="lg" mb="6" textAlign="center">
        {filters.category || "All Products"}
        {filters.gender && ` for ${filters.gender}`}
      </Heading>

      {loading ? (
        <Box textAlign="center" mt="20px">
          <Spinner size="lg" color="blue.500" />
        </Box>
      ) : error ? (
        <Text color="red.500" textAlign="center">{error}</Text>
      ) : (
        <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={6}>
          {/* Filters sidebar */}
          <Box borderRight="1px" borderColor="gray.200" p={4}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md">Filters</Heading>
              {activeFilterCount > 0 && (
                <Button size="sm" onClick={clearFilters} colorScheme="red" variant="outline">
                  Clear All ({activeFilterCount})
                </Button>
              )}
            </Flex>
            
            <Stack spacing={4}>
              {/* Category filter */}
              <FormControl>
                <FormLabel fontWeight="bold">Category</FormLabel>
                <Select 
                  value={filters.category} 
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  placeholder="All Categories"
                >
                  {filterOptions.categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Select>
              </FormControl>
              
              {/* Sub-category filter */}
              {filters.category && (
                <FormControl>
                  <FormLabel fontWeight="bold">Sub-Category</FormLabel>
                  <Select 
                    value={filters.subCategory} 
                    onChange={(e) => handleFilterChange("subCategory", e.target.value)}
                    placeholder="All Sub-Categories"
                  >
                    {filterOptions.subCategories
                      .filter(subCat => {
                        // Find products that match both the selected category and this subCategory
                        return products.some(product => 
                          product.category === filters.category && 
                          product.subCategory === subCat
                        );
                      })
                      .map(subCat => (
                        <option key={subCat} value={subCat}>{subCat}</option>
                      ))
                    }
                  </Select>
                </FormControl>
              )}
              
              {/* Gender filter */}
              <FormControl>
                <FormLabel fontWeight="bold">Gender</FormLabel>
                <Stack>
                  {filterOptions.genders.map(gender => (
                    <Checkbox 
                      key={gender}
                      isChecked={filters.gender === gender}
                      onChange={() => handleFilterChange("gender", filters.gender === gender ? "" : gender)}
                    >
                      {gender}
                    </Checkbox>
                  ))}
                </Stack>
              </FormControl>
              
              {/* Frame Material filter */}
              {filterOptions.frameMaterials.length > 0 && (
                <FormControl>
                  <FormLabel fontWeight="bold">Frame Material</FormLabel>
                  <Stack>
                    {filterOptions.frameMaterials.map(material => (
                      <Checkbox 
                        key={material}
                        isChecked={filters.frameMaterial === material}
                        onChange={() => handleFilterChange("frameMaterial", filters.frameMaterial === material ? "" : material)}
                      >
                        {material}
                      </Checkbox>
                    ))}
                  </Stack>
                </FormControl>
              )}
              
              {/* Price Range filter */}
              <FormControl>
                <FormLabel fontWeight="bold">Price Range</FormLabel>
                <RangeSlider
                  aria-label={['min', 'max']}
                  min={0}
                  max={10000}
                  step={100}
                  value={filters.priceRange}
                  onChange={(val) => handleFilterChange("priceRange", val)}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
                <Flex justify="space-between">
                  <Text>₹{filters.priceRange[0]}</Text>
                  <Text>₹{filters.priceRange[1]}</Text>
                </Flex>
              </FormControl>
            </Stack>
          </Box>
          
          {/* Product display area */}
          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <Text>{filteredProducts.length} Products</Text>
              <FormControl maxW="200px">
                <Select 
                  value={filters.sort}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </Select>
              </FormControl>
            </Flex>
            
            {/* Active filters display */}
            {activeFilterCount > 0 && (
              <Flex gap={2} mb={4} flexWrap="wrap">
                {Object.entries(filters).map(([key, value]) => {
                  if (value && key !== 'sort' && key !== 'priceRange') {
                    return (
                      <Badge 
                        key={key} 
                        colorScheme="teal" 
                        borderRadius="full" 
                        px={3} 
                        py={1}
                        display="flex"
                        alignItems="center"
                      >
                        {key}: {value}
                        <Box 
                          ml={2} 
                          cursor="pointer"
                          onClick={() => handleFilterChange(key, "")}
                          fontWeight="bold"
                        >
                          ×
                        </Box>
                      </Badge>
                    );
                  }
                  return null;
                })}
              </Flex>
            )}
            
            {filteredProducts.length > 0 ? (
              <ProductCard products={filteredProducts} />
            ) : (
              <Text textAlign="center" fontSize="18px" color="gray.500" mt="40px">
                No products match your current filters
              </Text>
            )}
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default Product;