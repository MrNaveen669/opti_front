import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Box, Grid, Heading, Text, Button, Select, Checkbox, 
  Stack, FormControl, FormLabel, RangeSlider, 
  RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb,
  Flex, Badge, Spinner, IconButton, Icon 
} from "@chakra-ui/react";

import ProductCard from "./ProductCard";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { PRODUCT_ALL_URL } from "../../config/api"; 
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

// Helper function to standardize category names (GLOBAL)
const standardizeCategory = (category) => {
  if (!category) return "";
  
  // Convert to lowercase for case-insensitive comparison
  const lowerCategory = category.toLowerCase();
  
  // Map of various spellings to standardized versions
  const categoryMap = {
    // Eyeglasses variations
    'eyeglasses': 'Eye Glasses',
    'eye glasses': 'Eye Glasses',
    'eye glass': 'Eye Glasses',
    'eyeglass': 'Eye Glasses',
    
    // Sunglasses variations
    'sunglasses': 'Sun Glasses',
    'sun glasses': 'Sun Glasses',
    'sunglass': 'Sun Glasses',
    
    // Computer glasses variations
    'computer glasses': 'Computer Glasses',
    'computer glass': 'Computer Glasses',
    
    // Contact lenses variations
    'contact lenses': 'Contact Lenses',
    'contact lens': 'Contact Lenses',
    
    // Power sunglasses variations
    'power sunglasses': 'Power Sunglasses',
    'power sun glasses': 'Power Sunglasses',
    
    // Progressive lenses variations
    'progressive lenses': 'Progressive Lenses',
    'progressive lens': 'Progressive Lenses',
  };
  
  // Return the standardized version or the original if not found
  return categoryMap[lowerCategory] || category;
};

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Add search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Add filter visibility state
  const [showFilters, setShowFilters] = useState(false);
  
  // Updated filter states to include Contact Lens specific filters
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    frameBrand: "",
    gender: "",
    frameMaterial: "",
    // Contact Lens specific filters
    brand: "",
    power: "",
    color: "",
    priceRange: [0, 10000],
    sort: "recommended"
  });

  // Available filter options (will be populated from products)
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    subCategories: [],
    frameBrands: [],
    genders: [],
    frameMaterials: [],
    // Contact Lens specific options
    brands: [],
    powers: [],
    colors: []
  });

  // Check if current category is Contact Lens
  const isContactLensCategory = () => {
    return standardizeCategory(filters.category) === "Contact Lenses";
  };

  // Search function that can be called from navbar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Make search function available globally
  useEffect(() => {
    window.handleProductSearch = handleSearch;
    return () => {
      delete window.handleProductSearch;
    };
  }, []);

  useEffect(() => {
    // Parse query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const urlFilters = {};
    
    // Check for search query in URL
    if (queryParams.get("search")) {
      setSearchQuery(queryParams.get("search"));
    }
    
    // Update filters based on URL parameters and standardize category
    if (queryParams.get("category")) {
      urlFilters.category = standardizeCategory(queryParams.get("category"));
    }
    if (queryParams.get("subCategory")) urlFilters.subCategory = queryParams.get("subCategory");
    if (queryParams.get("frameBrand")) urlFilters.frameBrand = queryParams.get("frameBrand");
    if (queryParams.get("gender")) urlFilters.gender = queryParams.get("gender");
    if (queryParams.get("frameMaterial")) urlFilters.frameMaterial = queryParams.get("frameMaterial");
    
    // Contact Lens specific URL parameters
    if (queryParams.get("brand")) urlFilters.brand = queryParams.get("brand");
    if (queryParams.get("power")) urlFilters.power = queryParams.get("power");
    if (queryParams.get("color")) urlFilters.color = queryParams.get("color");
    
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
        
        // Standardize categories in the product data and clean up contact lens data
        const standardizedData = data.map(product => {
          const standardizedProduct = {
            ...product,
            category: standardizeCategory(product.category)
          };
          
          // For Contact Lenses, ensure brand is properly set
          if (standardizedProduct.category === "Contact Lenses") {
            // If brand is empty but subCategory exists, use subCategory as brand
            if (!standardizedProduct.brand && standardizedProduct.subCategory) {
              standardizedProduct.brand = standardizedProduct.subCategory;
            }
          }
          
          // AUTOMATIC FRAME BRAND EXTRACTION for non-Contact Lens products
          if (standardizedProduct.category !== "Contact Lenses") {
            if (!standardizedProduct.frameBrand) {
              // Priority 1: Use existing brand field if available
              if (standardizedProduct.brand) {
                standardizedProduct.frameBrand = standardizedProduct.brand;
              }
              // Priority 2: Extract brand from product name (first word before space or number)
              else if (standardizedProduct.name) {
                // Extract brand from name like "MG 1944" -> "MG", "Ray-Ban Classic" -> "Ray-Ban"
                const nameMatch = standardizedProduct.name.match(/^([A-Za-z\-]+)/);
                if (nameMatch) {
                  standardizedProduct.frameBrand = nameMatch[1];
                } else {
                  // Fallback: use first word of name
                  standardizedProduct.frameBrand = standardizedProduct.name.split(' ')[0] || "Generic";
                }
              }
              // Priority 3: Use subCategory if available
              else if (standardizedProduct.subCategory) {
                standardizedProduct.frameBrand = standardizedProduct.subCategory;
              }
              // Priority 4: Default to "Generic"
              else {
                standardizedProduct.frameBrand = "Generic";
              }
            }
          }
          
          return standardizedProduct;
        });
        
        setProducts(standardizedData);
        
        // Extract available filter options from products with standardized categories
        const categories = [...new Set(standardizedData.map(product => product.category))];
        const subCategories = [...new Set(standardizedData.map(product => product.subCategory).filter(Boolean))];
        
        // Extract frameBrands from non-Contact Lens products only
        const nonContactLensProducts = standardizedData.filter(product => 
          standardizeCategory(product.category) !== "Contact Lenses"
        );
        
        let frameBrands = [...new Set(nonContactLensProducts
          .map(product => product.frameBrand)
          .filter(Boolean)
        )].sort();
        
        // If no frameBrands found, create default ones based on brands
        if (frameBrands.length === 0) {
          frameBrands = [...new Set(nonContactLensProducts
            .map(product => product.brand)
            .filter(Boolean)
          )].sort();
          
          // If still no brands, add some default popular brands
          if (frameBrands.length === 0) {
            frameBrands = ["Ray-Ban", "Oakley", "Prada", "Gucci", "Versace", "Tom Ford", "Armani", "Calvin Klein"].sort();
          }
        }
        
        const genders = [...new Set(standardizedData.map(product => product.gender).filter(Boolean))];
        const frameMaterials = [...new Set(standardizedData.map(product => product.frameMaterial).filter(Boolean))].sort();
        
        // Contact Lens specific filter options
        const contactLensProducts = standardizedData.filter(product => 
          standardizeCategory(product.category) === "Contact Lenses"
        );
        
        const brands = [...new Set(contactLensProducts
          .map(product => product.brand || product.subCategory)
          .filter(Boolean))].sort();
        
        const powers = [...new Set(contactLensProducts
          .map(product => product.power)
          .filter(Boolean))].sort();
        
        const colors = [...new Set(contactLensProducts
          .map(product => product.color)
          .filter(Boolean))].sort();
        
        setFilterOptions({
          categories,
          subCategories,
          frameBrands,
          genders,
          frameMaterials,
          brands,
          powers,
          colors
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  // Apply filters and search whenever products, filters, or search query changes
  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      // Apply search filter first
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        result = result.filter(product => {
          const searchableFields = [
            product.name,
            product.brand,
            product.category,
            product.subCategory,
            product.color,
            product.power,
            product.frameMaterial,
            product.frameBrand
          ].filter(Boolean); // Remove null/undefined values
          
          return searchableFields.some(field => 
            field.toLowerCase().includes(query)
          );
        });
      }
      
      // Apply category filter with case-insensitive matching
      if (filters.category) {
        const standardizedCategory = standardizeCategory(filters.category);
        result = result.filter(product => 
          standardizeCategory(product.category) === standardizedCategory
        );
      }
      
      // Apply subCategory filter (for non-Contact Lens products)
      if (filters.subCategory && !isContactLensCategory()) {
        result = result.filter(product => product.subCategory === filters.subCategory);
      }
      
      // Apply frameBrand filter (for non-Contact Lens products)
      if (filters.frameBrand && !isContactLensCategory()) {
        result = result.filter(product => product.frameBrand === filters.frameBrand);
      }
      
      // Apply gender filter (for non-Contact Lens products)
      if (filters.gender && !isContactLensCategory()) {
        result = result.filter(product => product.gender === filters.gender);
      }
      
      // Apply frameMaterial filter (for non-Contact Lens products)
      if (filters.frameMaterial && !isContactLensCategory()) {
        result = result.filter(product => 
          product.frameMaterial && product.frameMaterial.includes(filters.frameMaterial)
        );
      }
      
      // Contact Lens specific filters
      if (isContactLensCategory()) {
        // Apply brand filter - check both brand and subCategory fields
        if (filters.brand) {
          result = result.filter(product => 
            product.brand === filters.brand || product.subCategory === filters.brand
          );
        }
        
        // Apply power filter
        if (filters.power) {
          result = result.filter(product => product.power === filters.power);
        }
        
        // Apply color filter
        if (filters.color) {
          result = result.filter(product => product.color === filters.color);
        }
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
        result.sort((a, b) => b._id.localeCompare(a._id));
      } else if (filters.sort === "popular") {
        // Sort by popularity if you have such data
        result.sort(() => Math.random() - 0.5);
      }
      
      setFilteredProducts(result);
    }
  }, [products, filters, searchQuery]);

  // Updated handleFilterChange to update URL and close mobile filters
  const handleFilterChange = (field, value) => {
    let newFilters = { ...filters };
    
    if (field === "category") {
      value = standardizeCategory(value);
      // Clear Contact Lens specific filters when category changes
      newFilters = { 
        ...newFilters, 
        [field]: value,
        brand: "",
        power: "",
        color: "",
        gender: "",
        frameMaterial: "",
        frameBrand: ""
      };
    } else {
      newFilters = { ...newFilters, [field]: value };
    }
    
    setFilters(newFilters);
    
    // Update URL with new filters (excluding empty values)
    const searchParams = new URLSearchParams();
    
    // Add search query to URL if it exists
    if (searchQuery.trim()) {
      searchParams.set('search', searchQuery);
    }
    
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val && key !== 'sort' && key !== 'priceRange') {
        searchParams.set(key, val);
      }
    });
    
    // Add sort if it's not default
    if (newFilters.sort !== 'recommended') {
      searchParams.set('sort', newFilters.sort);
    }
    
    // Update URL without page reload
    const newSearch = searchParams.toString();
    navigate(`${location.pathname}${newSearch ? `?${newSearch}` : ''}`, { replace: true });
    
    // Close mobile filters on selection (on mobile devices)
    if (window.innerWidth <= 768) {
      setShowFilters(false);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      subCategory: "",
      frameBrand: "",
      gender: "",
      frameMaterial: "",
      brand: "",
      power: "",
      color: "",
      priceRange: [0, 10000],
      sort: "recommended"
    };
    
    setFilters(clearedFilters);
    setSearchQuery(""); // Clear search query
    
    // Clear URL params
    navigate(location.pathname, { replace: true });
  };

  // Get active filter count (including search)
  const activeFilterCount = Object.keys(filters).filter(key => 
    key !== 'sort' && 
    key !== 'priceRange' && 
    filters[key]
  ).length + (searchQuery.trim() ? 1 : 0);

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Box>
      <Navbar />
      <br />
      <br />
      <Box p="20px" minHeight="635">
        <Heading size="lg" mb="6" textAlign="center">
          {searchQuery ? `Search Results for "${searchQuery}"` : (filters.category || "All Products")}
          {filters.gender && ` for ${filters.gender}`}
          {filters.brand && ` - ${filters.brand}`}
          {filters.frameBrand && ` - ${filters.frameBrand}`}
          {filters.power && ` (${filters.power})`}
          {filters.color && ` - ${filters.color}`}
        </Heading>

        {loading ? (
          <Box textAlign="center" mt="20px">
            <Spinner size="lg" color="blue.500" />
          </Box>
        ) : error ? (
          <Text color="red.500" textAlign="center">{error}</Text>
        ) : (
          <>
            {/* Mobile Filter Toggle Button */}
            <Box display={{ base: "block", lg: "none" }} mb={4}>
              <Button
                onClick={toggleFilters}
                colorScheme="blue"
                variant="outline"
                width="100%"
                leftIcon={<Icon as={showFilters ? ChevronUpIcon : ChevronDownIcon} />}
              >
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </Box>

            <Grid 
              templateColumns={{ base: "1fr", lg: "250px 1fr" }} 
              gap={6}
            >
              {/* Filters sidebar - Collapsible on mobile */}
              <Box 
                borderRight={{ base: "none", lg: "1px" }}
                borderColor="gray.200" 
                p={4}
                display={{ 
                  base: showFilters ? "block" : "none", 
                  lg: "block" 
                }}
                position={{ base: "relative", lg: "static" }}
                bg={{ base: "white", lg: "transparent" }}
                boxShadow={{ base: showFilters ? "md" : "none", lg: "none" }}
                borderRadius={{ base: "md", lg: "none" }}
                mb={{ base: showFilters ? 4 : 0, lg: 0 }}
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md">Filters</Heading>
                  <Flex gap={2}>
                    {activeFilterCount > 0 && (
                      <Button 
                        size="sm" 
                        onClick={clearFilters} 
                        colorScheme="red" 
                        variant="outline"
                      >
                        Clear All ({activeFilterCount})
                      </Button>
                    )}
                    {/* Close button for mobile */}
                    <IconButton
                      display={{ base: "flex", lg: "none" }}
                      icon={<CloseIcon />}
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      aria-label="Close filters"
                    />
                  </Flex>
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
                  
                  {/* Contact Lens specific filters */}
                  {isContactLensCategory() ? (
                    <>
                      {/* Brand filter for Contact Lens */}
                      <FormControl>
                        <FormLabel fontWeight="bold">Brand</FormLabel>
                        <Select 
                          value={filters.brand} 
                          onChange={(e) => handleFilterChange("brand", e.target.value)}
                          placeholder="All Brands"
                        >
                          {filterOptions.brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </Select>
                      </FormControl>
                      
                      {/* Power filter for Contact Lens */}
                      <FormControl>
                        <FormLabel fontWeight="bold">Power</FormLabel>
                        <Select 
                          value={filters.power} 
                          onChange={(e) => handleFilterChange("power", e.target.value)}
                          placeholder="All Powers"
                        >
                          {filterOptions.powers.map(power => (
                            <option key={power} value={power}>{power}</option>
                          ))}
                        </Select>
                      </FormControl>
                      
                      {/* Color filter for Contact Lens */}
                      <FormControl>
                        <FormLabel fontWeight="bold">Color</FormLabel>
                        <Select 
                          value={filters.color} 
                          onChange={(e) => handleFilterChange("color", e.target.value)}
                          placeholder="All Colors"
                        >
                          {filterOptions.colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  ) : (
                    <>
                      {/* Sub-category filter for non-Contact Lens */}
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
                                  standardizeCategory(product.category) === standardizeCategory(filters.category) && 
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

                      {/* Frame Brand filter - SHOWS ALL BRANDS ALWAYS */}
                      <FormControl>
                        <FormLabel fontWeight="bold">Frame Brand</FormLabel>
                        <Select 
                          value={filters.frameBrand} 
                          onChange={(e) => handleFilterChange("frameBrand", e.target.value)}
                          placeholder="All Frame Brands"
                        >
                          {filterOptions.frameBrands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </Select>
                        {filterOptions.frameBrands.length === 0 && (
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            No frame brands available
                          </Text>
                        )}
                      </FormControl>
                      
                      {/* Gender filter for non-Contact Lens */}
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
                      
                      {/* Frame Material filter for non-Contact Lens */}
                      {/* {filterOptions.frameMaterials.length > 0 && (
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
                      )} */}
                    </>
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
                <Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={2}>
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
                    {/* Show search query as a badge */}
                    {searchQuery.trim() && (
                      <Badge 
                        colorScheme="blue" 
                        borderRadius="full" 
                        px={3} 
                        py={1}
                        display="flex"
                        alignItems="center"
                      >
                        Search: "{searchQuery}"
                        <Box 
                          ml={2} 
                          cursor="pointer"
                          onClick={() => setSearchQuery("")}
                          fontWeight="bold"
                        >
                          ×
                        </Box>
                      </Badge>
                    )}
                    
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
                  <Box textAlign="center" mt="40px">
                    <Text fontSize="18px" color="gray.500" mb={4}>
                      No products match your current {searchQuery ? 'search' : 'filters'}
                    </Text>
                  </Box>
                )}
              </Box>
            </Grid>
          </>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Product;
