export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  stock: number;
  isLimitedStock: boolean;
  description: string;
  specs?: {[key: string]: string};
  compatibility: string[];
  powerConsumption: number;
}

export const products: Product[] = [
  // CPUs
  {
    id: 'cpu1',
    name: 'Intel Core i9-13900K',
    category: 'CPU',
    brand: 'Intel',
    price: 599,
    image: 'https://www.google.com/imgres?q=Intel%20Core%20i9-13900K&imgurl=http%3A%2F%2Fshop.villman.com%2Fcdn%2Fshop%2Ffiles%2F19-118-412-V01_1024x_5f9ae697-0c24-4ade-b995-c25b957290e6.webp%3Fv%3D1686927394&imgrefurl=https%3A%2F%2Fshop.villman.com%2Fproducts%2Fcore-i9-13900k-processor%3Fsrsltid%3DAfmBOoooBb_xnwwBfNh-zeApWde3aid_91LmqcjU5Q1Xr-oZ2VITScY2&docid=YFqJciznlf5RMM&tbnid=MbkRHCH6LRAtTM&vet=12ahUKEwjXu7iQq4mUAxUB1jgGHYjxGOsQnPAOegQIFRAB..i&w=1024&h=768&hcb=2&ved=2ahUKEwjXu7iQq4mUAxUB1jgGHYjxGOsQnPAOegQIFRAB',
    rating: 4.8,
    stock: 15,
    isLimitedStock: true,
    description: 'High-performance 13th generation processor with 24 cores',
    specs: {
      cores: '24 (8P + 16E)',
      'base_clock': '3.0 GHz',
      'boost_clock': '5.8 GHz',
      socket: 'LGA1700'
    },
    compatibility: ['intel'],
  },
  {
    id: 'cpu2',
    name: 'AMD Ryzen 9 7900X',
    category: 'CPU',
    brand: 'AMD',
    price: 549,
    image: 'https://www.google.com/imgres?q=AMD%20Ryzen%209%207900X%27&imgurl=http%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Ffiles%2Ffhmghjm_fhgj_1024x.jpg%3Fv%3D1769674881&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Famd-ryzen-9-7900x-processor&docid=1k3_mXoPAExSlM&tbnid=78avbirR6eGCmM&vet=12ahUKEwi7h6aeq4mUAxVKzTgGHfn8B1kQnPAOegQIIRAB..i&w=1024&h=1024&hcb=2&ved=2ahUKEwi7h6aeq4mUAxVKzTgGHfn8B1kQnPAOegQIIRAB',
    rating: 4.7,
    stock: 25,
    isLimitedStock: false,
    description: 'Latest Zen 4 architecture processor with 12 cores',
    specs: {
      cores: '12',
      'base_clock': '4.7 GHz',
      'boost_clock': '5.6 GHz',
      socket: 'AM5'
    },
    compatibility: ['amd'],
    powerConsumption: 105
  },
  {
    id: 'cpu3',
    name: 'Intel Core i7-13700K',
    category: 'CPU',
    brand: 'Intel',
    price: 419,
    image: 'https://www.google.com/imgres?q=Intel%20Core%20i7-13700K&imgurl=http%3A%2F%2Fshop.villman.com%2Fcdn%2Fshop%2Ffiles%2F13700k-i7.webp%3Fv%3D1686928092&imgrefurl=https%3A%2F%2Fshop.villman.com%2Fproducts%2Fcore-i7-13700k-processor%3Fsrsltid%3DAfmBOorBiJQtnaHY3sfEZxlQs1qjzRTvJ49g1rWjgjE7koANK2wRFbSh&docid=YHV_Jj920YjwrM&tbnid=_JVJdp7eHF82YM&vet=12ahUKEwimuNipq4mUAxUujGMGHaXtLxQQnPAOegQIGRAB..i&w=1280&h=960&hcb=2&ved=2ahUKEwimuNipq4mUAxUujGMGHaXtLxQQnPAOegQIGRAB',
    rating: 4.6,
    stock: 30,
    isLimitedStock: false,
    description: '13th gen processor with excellent gaming performance',
    specs: {
      cores: '16 (8P + 8E)',
      'base_clock': '3.4 GHz',
      'boost_clock': '5.4 GHz',
      socket: 'LGA1700'
    },
    compatibility: ['intel'],
    powerConsumption: 125
  },
  {
    id: 'cpu4',
    name: 'AMD Ryzen 7 7700X',
    category: 'CPU',
    brand: 'AMD',
    price: 399,
    image: 'https://www.google.com/imgres?q=AMD%20Ryzen%207%207700X&imgurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Ffiles%2Fzdfdxgnfgn_800x.jpg%3Fv%3D1769672937&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Famd-ryzen-7-7700x-processor&docid=opOAhkjsf6kUUM&tbnid=a8YrF9hMgCAZvM&vet=12ahUKEwjcr6bJq4mUAxX4oWMGHcihHGkQnPAOegQIFxAB..i&w=800&h=800&hcb=2&ved=2ahUKEwjcr6bJq4mUAxX4oWMGHcihHGkQnPAOegQIFxAB',
    rating: 4.5,
    stock: 40,
    isLimitedStock: false,
    description: '8-core processor perfect for gaming and content creation',
    specs: {
      cores: '8',
      'base_clock': '4.5 GHz',
      'boost_clock': '5.4 GHz',
      socket: 'AM5'
    },
    compatibility: ['amd'],
    powerConsumption: 105
  },
  {
    id: 'cpu5',
    name: 'Intel Core i5-13600K',
    category: 'CPU',
    brand: 'Intel',
    price: 319,
    image: 'https://www.google.com/imgres?q=Intel%20Core%20i5-13600K&imgurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Ffiles%2Fdfbdxgnfdfgn_800x.jpg%3Fv%3D1769673114&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Fintel-core-i5-13600k-13th-gen-3-5ghz-14-core-lga-1700-processor-bx8071513600k&docid=jdDdWAsNvBTmkM&tbnid=zk0G_UgzyBZJlM&vet=12ahUKEwjrnZnUq4mUAxXqbvUHHdpwOzYQnPAOegQIExAB..i&w=800&h=800&hcb=2&ved=2ahUKEwjrnZnUq4mUAxXqbvUHHdpwOzYQnPAOegQIExAB',
    rating: 4.7,
    stock: 50,
    isLimitedStock: false,
    description: 'Mid-range powerhouse with hybrid architecture',
    specs: {
      cores: '14 (6P + 8E)',
      'base_clock': '3.5 GHz',
      'boost_clock': '5.1 GHz',
      socket: 'LGA1700'
    },
    compatibility: ['intel'],
    powerConsumption: 125
  },

  // GPUs
  {
    id: 'gpu1',
    name: 'NVIDIA RTX 4090',
    category: 'GPU',
    brand: 'NVIDIA',
    price: 1599,
    image: 'https://www.google.com/imgres?q=NVIDIA%20RTX%204090&imgurl=https%3A%2F%2Fbermorzone.com.ph%2Fwp-content%2Fuploads%2F2022%2F09%2FGeForce-RTX%25C2%25AE-4090-GAMING-X-TRIO-24G.jpg&imgrefurl=https%3A%2F%2Fbermorzone.com.ph%2Fshop%2Fvideo-cards%2Fnvidia-video-cards%2Fmsi-geforce-rtx-4090-gaming-x-trio-24gb-gddr6x-384-bit-graphics-card%2F%3Fsrsltid%3DAfmBOorJD-hL-T-Mv4jW0As_ctyMXtSaij1hOa3088Pm8BQTA-3KKMER&docid=lNGNsIDjE9yLXM&tbnid=poAHoDSumX8N8M&vet=12ahUKEwixzNXoq4mUAxXCdPUHHeVNJlsQnPAOegQIGBAB..i&w=1024&h=819&hcb=2&ved=2ahUKEwixzNXoq4mUAxXCdPUHHeVNJlsQnPAOegQIGBAB',
    rating: 4.9,
    stock: 5,
    isLimitedStock: true,
    description: 'Ultimate 4K gaming performance with RT and DLSS 3',
    specs: {
      memory: '24GB GDDR6X',
      'memory_bus': '384-bit',
      'base_clock': '2230 MHz',
      'boost_clock': '2520 MHz'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 450
  },
  {
    id: 'gpu2',
    name: 'NVIDIA RTX 4080',
    category: 'GPU',
    brand: 'NVIDIA',
    price: 1199,
    image: 'https://www.google.com/imgres?q=NVIDIA%20RTX%204080&imgurl=https%3A%2F%2Fbermorzone.com.ph%2Fwp-content%2Fuploads%2F2024%2F01%2FGeForce-RTX-4080-SUPER-16G-GAMING-X-SLIM-btz-ph-1.webp&imgrefurl=https%3A%2F%2Fbermorzone.com.ph%2Fshop%2Fvideo-cards%2Fnvidia-video-cards%2Fmsi-geforce-rtx-4080-super-16g-gaming-gaming-x-slim-graphics-card%2F%3Fsrsltid%3DAfmBOopZDOw0qklgb3Q1jbWMsjTNeLYT_L3fTu8uaKQwpqR8jJQHNTki&docid=ZABrfCoe2Nv8uM&tbnid=qfCLlFyXV4IocM&vet=12ahUKEwi8ke7vq4mUAxW9na8BHRhVDTMQnPAOegQIFhAB..i&w=819&h=819&hcb=2&ved=2ahUKEwi8ke7vq4mUAxW9na8BHRhVDTMQnPAOegQIFhAB',
    rating: 4.8,
    stock: 12,
    isLimitedStock: true,
    description: 'High-end graphics card for 4K gaming',
    specs: {
      memory: '16GB GDDR6X',
      'memory_bus': '256-bit',
      'base_clock': '2205 MHz',
      'boost_clock': '2505 MHz'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 320
  },
  {
    id: 'gpu3',
    name: 'AMD RX 7900 XTX',
    category: 'GPU',
    brand: 'AMD',
    price: 999,
    image: 'https://www.google.com/imgres?q=AMD%20RX%207900%20XTX&imgurl=https%3A%2F%2Fimage-cdn.ubuy.com%2Fasus-tuf-gaming-amd-radeon-rx-7900-xtx%2F400_400_100%2F681775bfbc2757505805375b.jpg&imgrefurl=https%3A%2F%2Fwww.ubuy.com.ph%2Fproduct%2FFOJWLAE2C-asus-tuf-gaming-amd-radeon-rx-7900-xtx-oc-edition-24gb-gddr6-graphics-card-pcie-4-0-24gb-gddr6-hdmi-2-1a-displayport-2-1%3Fsrsltid%3DAfmBOoqmS99GqJD8LquCjrEeWpS2L5lIoLh1ozcf_vvovt3o62KTe64n&docid=GGrOs0ESb6X5bM&tbnid=Nn5ycvzXGI-hVM&vet=12ahUKEwjQhKn4q4mUAxWLn68BHYRoDYsQnPAOegQIFhAB..i&w=400&h=400&hcb=2&itg=1&ved=2ahUKEwjQhKn4q4mUAxWLn68BHYRoDYsQnPAOegQIFhAB',
    rating: 4.6,
    stock: 18,
    isLimitedStock: false,
    description: 'Flagship RDNA 3 graphics card with 24GB VRAM',
    specs: {
      memory: '24GB GDDR6',
      'memory_bus': '384-bit',
      'base_clock': '2300 MHz',
      'boost_clock': '2500 MHz'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 355
  },
  {
    id: 'gpu4',
    name: 'AMD RX 7800 XT',
    category: 'GPU',
    brand: 'AMD',
    price: 899,
    image: 'https://www.google.com/imgres?q=AMD%20RX%207800%20XT&imgurl=https%3A%2F%2Fbermorzone.com.ph%2Fwp-content%2Fuploads%2F2023%2F08%2FRadeon%25E2%2584%25A2-RX-7800-XT-GAMING-OC-16G.webp&imgrefurl=https%3A%2F%2Fbermorzone.com.ph%2Fshop%2Fvideo-cards%2Famd-video-cards%2Fgigabyte-radeon-rx-7800-xt-gaming-oc-16gb-gddr6-256-bit-graphics-card%2F%3Fsrsltid%3DAfmBOoqCVTPkYznfxv-Fms4liqkwpGGWTYZLHUXgXhATPCDGGF1Kt7Ej&docid=6VBKHtWPj9f4FM&tbnid=LWwaB99l7ZEEnM&vet=12ahUKEwjin4uZrImUAxXbin0EHQIwI90QnPAOegQIGhAB..i&w=1000&h=1000&hcb=2&ved=2ahUKEwjin4uZrImUAxXbin0EHQIwI90QnPAOegQIGhAB',
    rating: 4.5,
    stock: 25,
    isLimitedStock: false,
    description: 'Excellent price-performance GPU for 1440p gaming',
    specs: {
      memory: '16GB GDDR6',
      'memory_bus': '256-bit',
      'base_clock': '2124 MHz',
      'boost_clock': '2430 MHz'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 263
  },
  {
    id: 'gpu5',
    name: 'NVIDIA RTX 4070',
    category: 'GPU',
    brand: 'NVIDIA',
    price: 699,
    image: 'https://www.google.com/imgres?q=NVIDIA%20RTX%204070&imgurl=https%3A%2F%2Fbermorzone.com.ph%2Fwp-content%2Fuploads%2F2024%2F01%2FMSI-GeForce-RTX-4070-SUPER-12G-GAMING-X-SLIM-btz-ph-1.webp&imgrefurl=https%3A%2F%2Fbermorzone.com.ph%2Fshop%2Fvideo-cards%2Fnvidia-video-cards%2Fmsi-geforce-rtx-4070-super-12g-gaming-slim-gaming-x-slim-graphics-card%2F%3Fsrsltid%3DAfmBOoqYWbnWCwQQk2mPT5PJmj7b6ueRvYCdsAtY-bPgS5yNPwwuY0Za&docid=jtV4nX8PrlAmFM&tbnid=yXg61gQZTPO6RM&vet=12ahUKEwjxqdqhrImUAxVzdvUHHXebOSIQnPAOegQIFhAB..i&w=500&h=400&hcb=2&ved=2ahUKEwjxqdqhrImUAxVzdvUHHXebOSIQnPAOegQIFhAB',
    rating: 4.4,
    stock: 35,
    isLimitedStock: false,
    description: 'Great 1440p gaming with RTX features',
    specs: {
      memory: '12GB GDDR6X',
      'memory_bus': '192-bit',
      'base_clock': '1920 MHz',
      'boost_clock': '2475 MHz'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 200
  },

  // Motherboards
  {
    id: 'mb1',
    name: 'ASUS ROG Strix Z790-E',
    category: 'Motherboard',
    brand: 'ASUS',
    price: 449,
    image: 'https://www.google.com/imgres?q=ASUS%20ROG%20Strix%20Z790-E&imgurl=https%3A%2F%2Fdlcdnwebimgs.asus.com%2Ffiles%2Fmedia%2F9A827026-9AD2-4CE7-9958-DB583A2DB6F8%2Fv1%2Fimg%2Fspec%2Fcooling.png&imgrefurl=https%3A%2F%2Frog.asus.com%2Fca-en%2Fmotherboards%2Frog-strix%2Frog-strix-z790-e-gaming-wifi-model%2F&docid=81kfHfXc8PjoYM&tbnid=LZYW7H-3oZPkXM&vet=12ahUKEwjXjs6prImUAxWFa_UHHR8zKVQQnPAOegQIFxAB..i&w=835&h=833&hcb=2&ved=2ahUKEwjXjs6prImUAxWFa_UHHR8zKVQQnPAOegQIFxAB',
    rating: 4.7,
    stock: 20,
    isLimitedStock: false,
    description: 'Premium Z790 motherboard with WiFi 6E and DDR5',
    specs: {
      socket: 'LGA1700',
      chipset: 'Z790',
      memory: 'DDR5-5600',
      'pcie_slots': '4x PCIe 5.0/4.0'
    },
    compatibility: ['intel'],
    powerConsumption: 0
  },
  {
    id: 'mb2',
    name: 'MSI X670E Carbon WiFi',
    category: 'Motherboard',
    brand: 'MSI',
    price: 399,
    image: 'https://www.google.com/imgres?q=MSI%20X670E%20Carbon%20WiFi&imgurl=http%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Ffiles%2Fg4s56g4sda_1024x.jpg%3Fv%3D1760340426&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Fmsi-mpg-x670e-carbon-wifi-amd-motherboard&docid=ig1G4cmLGCQcQM&tbnid=ZuXab8xV42eSuM&vet=12ahUKEwiZ_8vErImUAxUHiq8BHegFCqoQnPAOegQIGRAB..i&w=1024&h=1024&hcb=2&ved=2ahUKEwiZ_8vErImUAxUHiq8BHegFCqoQnPAOegQIGRAB',
    rating: 4.6,
    stock: 15,
    isLimitedStock: true,
    description: 'High-end X670E board with excellent connectivity',
    specs: {
      socket: 'AM5',
      chipset: 'X670E',
      memory: 'DDR5-5200',
      'pcie_slots': '3x PCIe 5.0/4.0'
    },
    compatibility: ['amd'],
    powerConsumption: 0
  },
  {
    id: 'mb3',
    name: 'ASUS TUF Z790-Plus',
    category: 'Motherboard',
    brand: 'ASUS',
    price: 289,
    image: 'https://www.google.com/imgres?q=ASUS%20TUF%20Z790-Plus&imgurl=https%3A%2F%2Fdlcdnwebimgs.asus.com%2Fgain%2F88be6c4e-815d-4341-9c91-731d9dfabdb5%2F&imgrefurl=https%3A%2F%2Fwww.asus.com%2Fuk%2Fmotherboards-components%2Fmotherboards%2Ftuf-gaming%2Ftuf-gaming-z790-plus-wifi-d4%2F&docid=979EfycODW6YoM&tbnid=e0B8146aB2uPZM&vet=12ahUKEwjhscDNrImUAxWLbvUHHRH4LfkQnPAOegQIHBAB..i&w=2400&h=2400&hcb=2&ved=2ahUKEwjhscDNrImUAxWLbvUHHRH4LfkQnPAOegQIHBAB',
    rating: 4.5,
    stock: 30,
    isLimitedStock: false,
    description: 'Reliable Z790 board with military-grade components',
    specs: {
      socket: 'LGA1700',
      chipset: 'Z790',
      memory: 'DDR5-5200',
      'pcie_slots': '3x PCIe 5.0/4.0'
    },
    compatibility: ['intel'],
    powerConsumption: 0
  },
  {
    id: 'mb4',
    name: 'Gigabyte B650 Aorus Elite',
    category: 'Motherboard',
    brand: 'Gigabyte',
    price: 199,
    image: 'https://www.google.com/imgres?q=Gigabyte%20B650%20Aorus%20Elite&imgurl=https%3A%2F%2Fwww.gigabyte.com%2FFileUpload%2FGlobal%2FKeyFeature%2F2518%2Finnergigabyte%2Fimages%2Fproduct%2Frgb%2Fcover.png&imgrefurl=https%3A%2F%2Fwww.aorus.com%2Fen-ph%2Fmotherboards%2Fb650-aorus-elite-ax-v2&docid=FTyd2dpiMrFhNM&tbnid=nXVP0wzOxEobIM&vet=12ahUKEwjC3MDUrImUAxUMZ_UHHUUvDbsQnPAOegQIFhAB..i&w=622&h=714&hcb=2&ved=2ahUKEwjC3MDUrImUAxUMZ_UHHUUvDbsQnPAOegQIFhAB',
    rating: 4.3,
    stock: 40,
    isLimitedStock: false,
    description: 'Value B650 motherboard with great features',
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      memory: 'DDR5-4800',
      'pcie_slots': '2x PCIe 4.0'
    },
    compatibility: ['amd'],
    powerConsumption: 0
  },

  // RAM
  {
    id: 'ram1',
    name: 'Corsair Vengeance DDR5-5600 32GB',
    category: 'RAM',
    brand: 'Corsair',
    price: 299,
    image: 'https://www.google.com/imgres?q=Corsair%20Vengeance%20DDR5-5600%2032GB&imgurl=http%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Ffiles%2Fbfdbdf_271298b6-cf11-48d6-88fc-82bb47efa91a_1024x.jpg%3Fv%3D1715155705&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Fcorsair-vengeance-rgb-ddr5-dram-5600mhz-cl36-memory-kit&docid=ssUw2JveXFxEnM&tbnid=OxY7j-3trGlAHM&vet=12ahUKEwi8h_TdrImUAxUinK8BHSCRLU8QnPAOegQIHBAB..i&w=1024&h=1024&hcb=2&ved=2ahUKEwi8h_TdrImUAxUinK8BHSCRLU8QnPAOegQIHBAB',
    rating: 4.6,
    stock: 50,
    isLimitedStock: false,
    description: 'High-performance DDR5 memory kit with RGB',
    specs: {
      capacity: '32GB (2x16GB)',
      speed: 'DDR5-5600',
      timings: 'CL36',
      voltage: '1.25V'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 10
  },
  {
    id: 'ram2',
    name: 'G.Skill Trident Z5 DDR5-6000 64GB',
    category: 'RAM',
    brand: 'G.Skill',
    price: 549,
    image: 'https://www.google.com/imgres?q=G.Skill%20Trident%20Z5%20DDR5-6000%2064GB&imgurl=https%3A%2F%2Fnetcodex.ph%2Fwp-content%2Fuploads%2F2024%2F10%2FG.SKILL-Trident-Z5-RGB-Series-Intel-XMP-3.0-DDR5-RAM-64GB-500x500.jpg.webp&imgrefurl=https%3A%2F%2Fnetcodex.ph%2Fproduct%2Fg-skill-trident-z5-rgb-ddr5-ram-6000-mt-s-cl30-1-40v-intel-xmp-64gb-2x32gb-white-desktop-memory-f5-6000j3040g32gx2-tz5rw%2F%3Fsrsltid%3DAfmBOorYggPq9hMhwQFxLVRT2dVzErGGIaQielmEpq_f_r-OHa-SndLh&docid=9fQDN68ys5jraM&tbnid=AyTMotnSkOaHsM&vet=12ahUKEwiJruvprImUAxUsZfUHHWKYCFQQnPAOegQIHRAB..i&w=500&h=500&hcb=2&itg=1&ved=2ahUKEwiJruvprImUAxUsZfUHHWKYCFQQnPAOegQIHRAB',
    rating: 4.8,
    stock: 20,
    isLimitedStock: false,
    description: 'Premium DDR5 kit for enthusiasts and creators',
    specs: {
      capacity: '64GB (2x32GB)',
      speed: 'DDR5-6000',
      timings: 'CL30',
      voltage: '1.35V'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 20
  },
  {
    id: 'ram3',
    name: 'Kingston Fury Beast DDR5-5200 16GB',
    category: 'RAM',
    brand: 'Kingston',
    price: 149,
    image: 'https://www.google.com/imgres?q=Kingston%20Fury%20Beast%20DDR5-5200%2016GB&imgurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Ffiles%2FLayer6_1a6e4827-6027-45fc-9e10-1fc88afcf281_800x.jpg%3Fv%3D1761129726&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Fkingston-fury-beast-16gb-ddr5-rgb-5200mt-s-memory-kit-of-2-kf552c40bbak2-16&docid=HLYbYbljUBzvqM&tbnid=sDYUY1OKZ6uRdM&vet=12ahUKEwje39HyrImUAxV8lK8BHaQ0HFAQnPAOegQIGhAB..i&w=800&h=800&hcb=2&ved=2ahUKEwje39HyrImUAxV8lK8BHaQ0HFAQnPAOegQIGhAB',
    rating: 4.4,
    stock: 60,
    isLimitedStock: false,
    description: 'Reliable DDR5 memory for gaming builds',
    specs: {
      capacity: '16GB (2x8GB)',
      speed: 'DDR5-5200',
      timings: 'CL40',
      voltage: '1.25V'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 8
  },

  // Storage
  {
    id: 'ssd1',
    name: 'Samsung 980 PRO 2TB',
    category: 'Storage',
    brand: 'Samsung',
    price: 199,
    image: 'https://www.google.com/imgres?q=Samsung%20980%20PRO%202TB&imgurl=http%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Ffiles%2FDSABVFGFHGF_1024x.jpg%3Fv%3D1705736090&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Fsamsung-980-pro-2tb-pcie-4-0-nvme-m-2-ssd-mz-v8p2t0bw&docid=5NHlcxXFiF6dOM&tbnid=9amxmKJIbtuJoM&vet=12ahUKEwi-vs35rImUAxUmnq8BHTp_N5EQnPAOegQIFhAB..i&w=1024&h=1024&hcb=2&ved=2ahUKEwi-vs35rImUAxUmnq8BHTp_N5EQnPAOegQIFhAB',
    rating: 4.8,
    stock: 40,
    isLimitedStock: false,
    description: 'High-performance NVMe SSD with excellent speeds',
    specs: {
      capacity: '2TB',
      interface: 'PCIe 4.0 x4',
      'read_speed': '7,000 MB/s',
      'write_speed': '6,900 MB/s'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 7
  },
  {
    id: 'ssd2',
    name: 'WD Black SN850X 4TB',
    category: 'Storage',
    brand: 'Western Digital',
    price: 399,
    image: 'https://www.google.com/imgres?q=WD%20Black%20SN850X%204TB&imgurl=http%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Fproducts%2Fwd-black-sn850x-nvme-ssd-front.png.wdthumb.1280.1280.jpg%3Fv%3D1707897519&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Fwd-black-sn850x-1tb-nvme-internal-gaming-ssd-wds100t2x0e&docid=8WFl3kRuc3iiqM&tbnid=uPXH6XpcXL1Y_M&vet=12ahUKEwjakqGArYmUAxUjbPUHHddeDlIQnPAOegQIHhAB..i&w=1280&h=1280&hcb=2&ved=2ahUKEwjakqGArYmUAxUjbPUHHddeDlIQnPAOegQIHhAB',
    rating: 4.7,
    stock: 25,
    isLimitedStock: false,
    description: 'Gaming-focused NVMe SSD with massive capacity',
    specs: {
      capacity: '4TB',
      interface: 'PCIe 4.0 x4',
      'read_speed': '7,300 MB/s',
      'write_speed': '6,600 MB/s'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 9
  },
  {
    id: 'ssd3',
    name: 'Crucial P5 Plus 1TB',
    category: 'Storage',
    brand: 'Crucial',
    price: 89,
    image: 'https://www.google.com/imgres?q=Crucial%20P5%20Plus%201TB&imgurl=https%3A%2F%2Fbermorzone.com.ph%2Fwp-content%2Fuploads%2F2021%2F09%2Fcrucial-p5-plus-600x600.jpg&imgrefurl=https%3A%2F%2Fbermorzone.com.ph%2Fshop%2Fstorage-devices%2Fsolid-state-drives%2Fcrucial-p5-plus-500gb-1tb-2tb-3d-nand-nvme-internal-ssd%2F%3Fsrsltid%3DAfmBOopgwZ3sHIPuacRi-HqrDN5PKOqWwQNUXNUtG3a-Bvuew4GMmeoK&docid=qvOx_vpm_9QfvM&tbnid=EArwC0oO32V0aM&vet=12ahUKEwirweCKrYmUAxXZkK8BHah-B08QnPAOegQIFhAB..i&w=600&h=600&hcb=2&ved=2ahUKEwirweCKrYmUAxXZkK8BHah-B08QnPAOegQIFhAB',
    rating: 4.5,
    stock: 80,
    isLimitedStock: false,
    description: 'Affordable PCIe 4.0 SSD with great performance',
    specs: {
      capacity: '1TB',
      interface: 'PCIe 4.0 x4',
      'read_speed': '6,600 MB/s',
      'write_speed': '5,000 MB/s'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 6
  },

  // PSU
  {
    id: 'psu1',
    name: 'Corsair RM1000x',
    category: 'PSU',
    brand: 'Corsair',
    price: 219,
    image: 'https://www.google.com/imgres?q=Corsair%20RM1000x&imgurl=https%3A%2F%2Fwww.primeabgb.com%2Fwp-content%2Fuploads%2F2025%2F08%2FCorsair-RM1000x-Shift-1000-Watt-80-Plus-Gold-ATX-3.0-SMPS-CP-9020253-IN.jpg&imgrefurl=https%3A%2F%2Fwww.primeabgb.com%2Fonline-price-reviews-india%2Fcorsair-rm1000x-shift-1000-watt-80-plus-gold-atx-3-0-smps-cp-9020253-in%2F&docid=etyl_v-bzbjsAM&tbnid=KOwoR6T0oycGeM&vet=12ahUKEwje6oyJpomUAxWIZfUHHUQpKQoQnPAOegQILRAB..i&w=500&h=500&hcb=2&ved=2ahUKEwje6oyJpomUAxWIZfUHHUQpKQoQnPAOegQILRAB',
    rating: 4.8,
    stock: 30,
    isLimitedStock: false,
    description: '1000W 80+ Gold modular power supply', 
    specs: {
      wattage: '1000W',
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      warranty: '10 Years'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 0
  },
  {
    id: 'psu2',
    name: 'Seasonic Focus GX-850',
    category: 'PSU',
    brand: 'Seasonic',
    price: 159,
    image: 'https://www.google.com/imgres?q=Seasonic%20Focus%20GX-850&imgurl=http%3A%2F%2Fecommerce.datablitz.com.ph%2Fcdn%2Fshop%2Ffiles%2Fxgncfghmf.jpg%3Fv%3D1766979317&imgrefurl=https%3A%2F%2Fecommerce.datablitz.com.ph%2Fproducts%2Fseasonic-focus-gx-850-atx-3-850w-80-gold-atx-3-1-pcie-gen-5-fully-modular-power-supply-black-srp-fgx851-a5a32sf&docid=7AaHL1VTOawG1M&tbnid=JWywo18p2T0S2M&vet=12ahUKEwjWkbSarYmUAxW1nK8BHQ2dNjsQnPAOegQIGBAB..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjWkbSarYmUAxW1nK8BHQ2dNjsQnPAOegQIGBAB',
    rating: 4.7,
    stock: 45,
    isLimitedStock: false,
    description: '850W 80+ Gold semi-modular PSU',
    specs: {
      wattage: '850W',
      efficiency: '80+ Gold',
      modular: 'Semi-Modular',
      warranty: '10 Years'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 0
  },
  {
    id: 'psu3',
    name: 'EVGA SuperNOVA 750 G6',
    category: 'PSU',
    brand: 'EVGA',
    price: 139,
    image: 'https://www.google.com/imgres?q=EVGA%20SuperNOVA%20750%20G6&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F61OM0JzyH8S._AC_UF350%2C350_QL80_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FEVGA-Supernova-Supply-Modular-Tester%2Fdp%2FB093QBTYX6&docid=TdxyXI5UEAyg2M&tbnid=ClLobN05_-TB4M&vet=12ahUKEwiZg-ahrYmUAxUWnK8BHeewJDgQnPAOegQIGRAB..i&w=350&h=305&hcb=2&ved=2ahUKEwiZg-ahrYmUAxUWnK8BHeewJDgQnPAOegQIGRAB',
    rating: 4.6,
    stock: 35,
    isLimitedStock: false,
    description: '750W 80+ Gold fully modular power supply',
    specs: {
      wattage: '750W',
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      warranty: '10 Years'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 0
  },

  // Cases
  {
    id: 'case1',
    name: 'Fractal Design Define 7',
    category: 'Case',
    brand: 'Fractal Design',
    price: 179,
    image: 'https://www.google.com/imgres?q=Fractal%20Design%20Define%207&imgurl=https%3A%2F%2Fwww.fractal-design.com%2Fapp%2Fuploads%2F2020%2F10%2FDefine_7_TGD_Black_Left_Front-810x810.jpg&imgrefurl=https%3A%2F%2Fwww.fractal-design.com%2Fproducts%2Fcases%2Fdefine%2Fdefine-7%2Fblack-tg-dark-tint%2F&docid=-A2eve-6AguKAM&tbnid=Nu19u9xhVenD3M&vet=12ahUKEwiYnICqrYmUAxXEbfUHHdAqO04QnPAOegQIGBAB..i&w=810&h=810&hcb=2&ved=2ahUKEwiYnICqrYmUAxXEbfUHHdAqO04QnPAOegQIGBAB',
    rating: 4.7,
    stock: 25,
    isLimitedStock: false,
    description: 'Silent mid-tower case with excellent airflow',
    specs: {
      size: 'Mid Tower',
      motherboard: 'ATX, mATX, ITX',
      'max_gpu': '440mm',
      'drive_bays': '6x 3.5", 4x 2.5"'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 0
  },
  {
    id: 'case2',
    name: 'Corsair 4000D Airflow',
    category: 'Case',
    brand: 'Corsair',
    price: 129,
    image: 'https://www.google.com/imgres?q=Corsair%204000D%20Airflow&imgurl=https%3A%2F%2Fwww.airdriecomputer.com%2Fcdn%2Fshop%2Ffiles%2F4000D_MODULAR_BLACK_1_1280x960_9db5c7e9-7637-402b-a90c-c561c0da769e_934x700.jpg%3Fv%3D1742916842&imgrefurl=https%3A%2F%2Fwww.airdriecomputer.com%2Fproducts%2Ftes%3Fsrsltid%3DAfmBOoo7NmQNPvQpqUzJQVmX3TUQlz73XMbZ0e90HMNrlftNJeoZNYfv&docid=G7Si0oEDT6x2yM&tbnid=C4Ci2Azbz6BrIM&vet=12ahUKEwj496XsqomUAxWt3TgGHaBlKfoQnPAOegQIHBAB..i&w=933&h=700&hcb=2&ved=2ahUKEwj496XsqomUAxWt3TgGHaBlKfoQnPAOegQIHBAB',
    rating: 4.6,
    stock: 40,
    isLimitedStock: false,
    description: 'High-airflow mid-tower with tempered glass',
    specs: {
      size: 'Mid Tower',
      motherboard: 'ATX, mATX, ITX',
      'max_gpu': '360mm',
      'drive_bays': '2x 3.5", 2x 2.5"'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 0
  },
  {
    id: 'case3',
    name: 'NZXT H7 Flow',
    category: 'Case',
    brand: 'NZXT',
    price: 149,
    image: 'https://www.google.com/imgres?q=NZXT%20H7%20Flow&imgurl=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0460%2F2567%2F0805%2Ffiles%2FNZXT-H7-FLOW-RGB-MESH-FRONT-ATX-M-ATX-ITX-TEMPERED-GLASS-BLACK-PC-CASE.webp%3Fv%3D1703116942&imgrefurl=https%3A%2F%2Fwww.makotekcomputers.com%2Fproducts%2Fh7-flow-rgb-black%3Fsrsltid%3DAfmBOoos1TpKitaEcFI8q0HPDLM_1jGEZmgaAtu_mJYkX_4gH4sa5BJJ&docid=jGczCENE2l0ndM&tbnid=FtkEPvGcn4B9-M&vet=12ahUKEwjS-pazrYmUAxVZafUHHUIyDrAQnPAOegQIHBAB..i&w=1000&h=1000&hcb=2&ved=2ahUKEwjS-pazrYmUAxVZafUHHUIyDrAQnPAOegQIHBAB',
    rating: 4.5,
    stock: 30,
    isLimitedStock: false,
    description: 'Modern RGB case with great cable management',
    specs: {
      size: 'Mid Tower',
      motherboard: 'ATX, mATX, ITX',
      'max_gpu': '381mm',
      'drive_bays': '4x 3.5", 6x 2.5"'
    },
    compatibility: ['intel', 'amd'],
    powerConsumption: 0
  }
];

export const categories = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case'];
export const brands = [...new Set(products.map(p => p.brand))];