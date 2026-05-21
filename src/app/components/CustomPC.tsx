import { useState } from 'react';
import { useAuth } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Computer, Cpu, HardDrive, MemoryStick, Monitor, Power, Zap, ShoppingCart, LogIn, PcCase, Pencil, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";
import { products } from './data/products';
import { formatUsdAsPhp, usdToPhp, formatPhp } from '../utils/currency';

interface CustomPCProps {
  navigateTo: (page: string) => void;
}

export function CustomPC({ navigateTo }: CustomPCProps) {
  const { user, addToCart, showAuthDialog } = useAuth();
  const [selectedComponents, setSelectedComponents] = useState<{[key: string]: any}>({
    CPU: null,
    GPU: null,
    Motherboard: null,
    RAM: null,
    Storage: null,
    PSU: null,
    Case: null
  });

  const categories = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case'];

  // Budget tiers with price ranges
  const budgetTiers = [
    { name: 'Starter', minBudget: 500, maxBudget: 1000, label: 'Office & Light Gaming' },
    { name: 'Budget', minBudget: 1000, maxBudget: 1500, label: 'Casual Gaming' },
    { name: 'Mid-Range', minBudget: 1500, maxBudget: 2500, label: '1080p-1440p Gaming' },
    { name: 'High-End', minBudget: 2500, maxBudget: 4000, label: '4K Gaming & Streaming' },
    { name: 'Enthusiast', minBudget: 4000, maxBudget: 10000, label: 'Max Performance' }
  ];

  const handleBudgetSelect = (tier: typeof budgetTiers[0]) => {
    if (!user) {
      showAuthDialog('Build Custom PC', 'Please sign in to build a custom PC.');
      return;
    }

    // Find best components for this budget tier
    const newComponents: {[key: string]: any} = {};
    let remainingBudget = tier.maxBudget;
    
    // Select CPU
    const cpuOptions = products.filter(p => p.category === 'CPU' && p.price <= remainingBudget * 0.25);
    if (cpuOptions.length > 0) {
      const cpu = cpuOptions.sort((a, b) => b.price - a.price)[0];
      newComponents.CPU = cpu;
      remainingBudget -= cpu.price;
    }

    // Select GPU based on remaining budget
    const gpuOptions = products.filter(p => p.category === 'GPU' && p.price <= remainingBudget * 0.35);
    if (gpuOptions.length > 0) {
      const gpu = gpuOptions.sort((a, b) => b.price - a.price)[0];
      newComponents.GPU = gpu;
      remainingBudget -= gpu.price;
    }

    // Select Motherboard
    const cpuType = newComponents.CPU?.compatibility[0] || 'intel';
    const mbOptions = products.filter(p => 
      p.category === 'Motherboard' && 
      p.price <= remainingBudget * 0.15 &&
      p.compatibility.includes(cpuType)
    );
    if (mbOptions.length > 0) {
      const mb = mbOptions.sort((a, b) => b.price - a.price)[0];
      newComponents.Motherboard = mb;
      remainingBudget -= mb.price;
    }

    // Select RAM
    const ramOptions = products.filter(p => p.category === 'RAM' && p.price <= remainingBudget * 0.12);
    if (ramOptions.length > 0) {
      const ram = ramOptions.sort((a, b) => b.price - a.price)[0];
      newComponents.RAM = ram;
      remainingBudget -= ram.price;
    }

    // Select Storage
    const storageOptions = products.filter(p => p.category === 'Storage' && p.price <= remainingBudget * 0.15);
    if (storageOptions.length > 0) {
      const storage = storageOptions.sort((a, b) => b.price - a.price)[0];
      newComponents.Storage = storage;
      remainingBudget -= storage.price;
    }

    // Select PSU
    const psuOptions = products.filter(p => p.category === 'PSU' && p.price <= remainingBudget * 0.15);
    if (psuOptions.length > 0) {
      const psu = psuOptions.sort((a, b) => b.price - a.price)[0];
      newComponents.PSU = psu;
      remainingBudget -= psu.price;
    }

    // Select Case
    const caseOptions = products.filter(p => p.category === 'Case' && p.price <= remainingBudget);
    if (caseOptions.length > 0) {
      const pcCase = caseOptions.sort((a, b) => b.price - a.price)[0];
      newComponents.Case = pcCase;
    }

    setSelectedComponents(newComponents);
    toast.success(`${tier.name} build loaded! Review and customize as needed.`);
  };
  
  const handleComponentSelect = (category: string, componentId: string) => {
    if (!user) {
      showAuthDialog('Build Custom PC', 'Please sign in to build a custom PC.');
      return;
    }

    const component = products.find(c => c.id === componentId);
    if (component) {
      setSelectedComponents(prev => ({
        ...prev,
        [category]: component
      }));
    }
  };

  const getCompatibleComponents = (category: string) => {
    const categoryComponents = products.filter(c => c.category === category);
    
    // If no CPU selected, show all
    if (!selectedComponents.CPU) {
      return categoryComponents;
    }

    // Filter based on CPU compatibility
    const cpuType = selectedComponents.CPU.compatibility[0]; // 'intel' or 'amd'
    return categoryComponents.filter(c => c.compatibility.includes(cpuType));
  };

  const totalPrice = Object.values(selectedComponents)
    .filter(Boolean)
    .reduce((sum, component) => sum + component!.price, 0);

  const totalPowerConsumption = Object.values(selectedComponents)
    .filter(Boolean)
    .reduce((sum, component) => sum + component!.powerConsumption, 0);

  const selectedPSU = selectedComponents.PSU;
  const psuWattage = selectedPSU?.specs?.wattage ? parseInt(selectedPSU.specs.wattage.replace('W', '')) : 0;
  const powerEfficient = psuWattage >= totalPowerConsumption + 100;

  const isComplete = categories.every(cat => selectedComponents[cat] !== null);

  const handleAddToCart = () => {
    if (!user) {
      showAuthDialog('Add Custom PC to Cart', 'Please sign in to add your custom PC build to cart.');
      return;
    }

    if (!isComplete) {
      toast.error('Please select all components first');
      return;
    }

    const customPC = {
      id: `custom-${Date.now()}`,
      name: 'Custom PC Build',
      price: totalPrice,
      image: getBuildImage(),
      stock: 1,
      quantity: 1
    };

    addToCart(customPC);
    toast.success('Custom PC added to cart!');
  };

  const handleAddComponentToCart = (component: any) => {
    if (!user) {
      showAuthDialog('Add Component to Cart', 'Please sign in to add components to your cart.');
      return;
    }

    addToCart(component);
    toast.success(`${component.name} added to cart!`);
  };

  const handleAddAllComponentsToCart = () => {
    if (!user) {
      showAuthDialog('Add Components to Cart', 'Please sign in to add components to your cart.');
      return;
    }

    const selectedComponentsList = Object.values(selectedComponents).filter(Boolean);
    if (selectedComponentsList.length === 0) {
      toast.error('No components selected');
      return;
    }

    selectedComponentsList.forEach(component => {
      addToCart(component);
    });

    toast.success(`${selectedComponentsList.length} components added to cart!`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'CPU': return <Cpu className="h-5 w-5" />;
      case 'GPU': return <Monitor className="h-5 w-5" />;
      case 'Motherboard': return <Computer className="h-5 w-5" />;
      case 'RAM': return <MemoryStick className="h-5 w-5" />;
      case 'Storage': return <HardDrive className="h-5 w-5" />;
      case 'PSU': return <Power className="h-5 w-5" />;
      case 'Case': return <PcCase className="h-5 w-5" />;
      default: return <Computer className="h-5 w-5" />;
    }
  };

  const getBuildImage = () => {
    // Return different PC images based on selected components
    if (selectedComponents.GPU?.name.includes('RTX 4090') || selectedComponents.GPU?.name.includes('RTX 4080')) {
      return 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80&fit=crop'; // High-end RGB build
    } else if (selectedComponents.CPU?.brand === 'AMD') {
      return 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80&fit=crop'; // AMD build
    } else if (selectedComponents.Case?.name.includes('RGB') || selectedComponents.Case?.name.includes('Flow')) {
      return 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80&fit=crop'; // RGB case build
    } else if (Object.values(selectedComponents).filter(Boolean).length > 3) {
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop'; // Partially built PC
    } else {
      return 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80&fit=crop'; // Empty case
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Custom PC Builder</h1>
          <p className="text-muted-foreground">
            Build your perfect PC by selecting compatible components
          </p>
          {!user && (
            <Alert className="mt-4">
              <LogIn className="h-4 w-4" />
              <AlertDescription>
                Sign in to start building your custom PC. 
                <Button variant="link" onClick={() => navigateTo('signin')} className="px-1">
                  Sign in here
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Budget Tier Selector */}
        <Card className="mb-8 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyan-400" />
              Quick Build - Select Budget Tier
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-400">Choose a budget tier and we'll auto-select compatible components for you. Then customize as needed.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {budgetTiers.map((tier) => (
                <Button
                  key={tier.name}
                  onClick={() => handleBudgetSelect(tier)}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 border-cyan-600/50 hover:border-cyan-400 hover:bg-cyan-950/30"
                >
                  <div className="text-center">
                    <p className="font-bold text-sm">{tier.name}</p>
                    <p className="text-xs text-slate-400">{formatPhp(usdToPhp(tier.minBudget))} - {formatPhp(usdToPhp(tier.maxBudget))}</p>
                    <p className="text-xs text-cyan-400 mt-1">{tier.label}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manual Build View */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Selection */}
          <div className="lg:col-span-2 space-y-6">
            {categories.map(category => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getCategoryIcon(category)}
                    <span className="ml-2">{category}</span>
                    {selectedComponents[category] && (
                      <Badge className="ml-auto">Selected</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedComponents[category] ? (
                    <div className="flex items-center space-x-4 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                      <div className="relative">
                        <ImageWithFallback
                          src={selectedComponents[category]!.image}
                          alt={selectedComponents[category]!.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                          <div className="w-2 h-2 bg-current rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{selectedComponents[category]!.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatUsdAsPhp(selectedComponents[category]!.price)}
                        </p>
                        {selectedComponents[category]!.specs && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {Object.entries(selectedComponents[category]!.specs).slice(0, 2).map(([key, value]) => 
                              `${key}: ${value}`
                            ).join(' â€¢ ')}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddComponentToCart(selectedComponents[category])}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedComponents(prev => ({...prev, [category]: null}))}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Select onValueChange={(value) => handleComponentSelect(category, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${category}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {getCompatibleComponents(category).map(component => (
                          <SelectItem key={component.id} value={component.id}>
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <span className="font-medium">{component.name}</span>
                                <span className="text-xs text-muted-foreground block">{component.brand}</span>
                              </div>
                              <span className="ml-4 font-semibold">{formatUsdAsPhp(component.price)}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Build Summary */}
          <div className="space-y-6">
            {/* PC Build Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Your PC Build</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <ImageWithFallback
                    src={getBuildImage()}
                    alt="Your PC Build"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  
                  {/* Component Indicators */}
                  <div className="absolute inset-0 p-4">
                    {/* CPU Position */}
                    {selectedComponents.CPU && (
                      <div className="absolute top-4 left-4 bg-blue-500/80 backdrop-blur-sm rounded-full p-2 animate-pulse">
                        <Cpu className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    {/* GPU Position */}
                    {selectedComponents.GPU && (
                      <div className="absolute top-1/2 right-4 bg-green-500/80 backdrop-blur-sm rounded-full p-2 animate-pulse">
                        <Monitor className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    {/* RAM Position */}
                    {selectedComponents.RAM && (
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-purple-500/80 backdrop-blur-sm rounded-full p-2 animate-pulse">
                        <MemoryStick className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    {/* Storage Position */}
                    {selectedComponents.Storage && (
                      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-orange-500/80 backdrop-blur-sm rounded-full p-2 animate-pulse">
                        <HardDrive className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    {/* PSU Position */}
                    {selectedComponents.PSU && (
                      <div className="absolute bottom-4 right-4 bg-red-500/80 backdrop-blur-sm rounded-full p-2 animate-pulse">
                        <Power className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    {/* Motherboard Position */}
                    {selectedComponents.Motherboard && (
                      <div className="absolute bottom-1/3 left-4 bg-yellow-500/80 backdrop-blur-sm rounded-full p-2 animate-pulse">
                        <Computer className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    {/* Case Position */}
                    {selectedComponents.Case && (
                      <div className="absolute top-4 right-4 bg-indigo-500/80 backdrop-blur-sm rounded-full p-2 animate-pulse">
                        <PcCase className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-sm font-medium">
                      {Object.values(selectedComponents).filter(Boolean).length}/7 Components Selected
                    </p>
                  </div>
                </div>
                
                {/* Component Legend */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>CPU</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>GPU</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>RAM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Storage</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>PSU</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Motherboard</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span>Case</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Components List */}
            {Object.values(selectedComponents).filter(Boolean).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(selectedComponents).map(([category, component]) => {
                      if (!component) return null;
                      return (
                        <div key={category} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                          <div className="relative">
                            <ImageWithFallback
                              src={component.image}
                              alt={component.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="absolute -top-1 -right-1">
                              {getCategoryIcon(category)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{component.name}</p>
                            <p className="text-xs text-muted-foreground">{category}</p>
                          </div>
                          <div className="text-right flex items-center gap-2">
                            <div>
                              <p className="text-sm font-medium">{formatUsdAsPhp(component.price)}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddComponentToCart(component)}
                              className="h-8 w-8 p-0"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {Object.values(selectedComponents).filter(Boolean).length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleAddAllComponentsToCart}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add All Components to Cart
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Build Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Components Selected</span>
                  <span>{Object.values(selectedComponents).filter(Boolean).length}/7</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Total Price</span>
                  <span className="font-semibold">{formatUsdAsPhp(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    Power Draw
                  </span>
                  <span>{totalPowerConsumption}W</span>
                </div>

                {selectedPSU && (
                  <div className="flex justify-between">
                    <span>PSU Capacity</span>
                    <span className={powerEfficient ? 'text-green-500' : 'text-red-500'}>
                      {psuWattage}W
                    </span>
                  </div>
                )}

                {!powerEfficient && selectedPSU && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Your PSU may not provide enough power. Consider upgrading.
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleAddToCart}
                  disabled={!isComplete}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {!user ? 'Sign in to Add to Cart' : 'Add Complete Build to Cart'}
                </Button>

                {isComplete && (
                  <Alert>
                    <AlertDescription>
                      Great! Your build is complete and all components are compatible.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compatibility Check</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>CPU & Motherboard</span>
                    <Badge variant={selectedComponents.CPU && selectedComponents.Motherboard ? 'default' : 'secondary'}>
                      {selectedComponents.CPU && selectedComponents.Motherboard ? 'Compatible' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Power Supply</span>
                    <Badge variant={powerEfficient ? 'default' : selectedPSU ? 'destructive' : 'secondary'}>
                      {!selectedPSU ? 'Pending' : powerEfficient ? 'Sufficient' : 'Insufficient'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Case Compatibility</span>
                    <Badge variant={selectedComponents.Case ? 'default' : 'secondary'}>
                      {selectedComponents.Case ? 'Selected' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}