import { Computer, Shield, Truck, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatUsdAsPhp } from '../utils/currency';

interface HomeProps {
  navigateTo: (page: string) => void;
}

export function Home({ navigateTo }: HomeProps) {
  const freeShippingThresholdUsd = 100;

  const features = [
    {
      icon: Computer,
      title: "Custom PC Builder",
      description: "Build your dream PC with our interactive configurator. Choose from thousands of compatible components."
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "All our products come with manufacturer warranty and our quality assurance guarantee."
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: `Free shipping on orders over ${formatUsdAsPhp(freeShippingThresholdUsd)}. Express delivery available for urgent builds.`
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team of PC building experts is here to help you make the right choices for your needs."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Major visual refresh: cinematic gradient hero with shimmer overlay and reveal animation */}
      <section className="hero-shell relative overflow-hidden py-20 lg:py-28" data-reveal>
        <div className="hero-shimmer" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                Build-Ready Components • Premium Support
              </div>
              <h1 className="text-[clamp(2.2rem,6vw,5rem)] font-black leading-[1.05] tracking-tight text-balance">
                Build Your Ultimate PC
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Discover the latest PC components and build your dream computer with our expert guidance and top-quality parts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" onClick={() => navigateTo('products')}>
                  Shop Components
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigateTo('custom-pc')}>
                  Build Custom PC
                </Button>
              </div>
            </div>
            <div className="relative" data-reveal>
              <ImageWithFallback
                src="https://www.google.com/imgres?q=pc%20build%20set%20up%20for%20website&imgurl=https%3A%2F%2Fhyperpc.ae%2Fimages%2Fproduct%2Fgaming-pc%2Fconfigurator%2Fhyperpc-configurator-mobile-banner-v1.jpg%3F1&imgrefurl=https%3A%2F%2Fhyperpc.ae%2Fconfigurator%3Fsrsltid%3DAfmBOoo97KCjO-oeYsr8boPe0943liAmW8XfH-t8g2duFd4dbN9a_Ofk&docid=o4DBvKsi9DU8KM&tbnid=VAEHJOjaUIXqeM&vet=12ahUKEwihkZruromUAxVLiK8BHdCTMmAQnPAOegQIHhAB..i&w=960&h=960&hcb=2&ved=2ahUKEwihkZruromUAxVLiK8BHdCTMmAQnPAOegQIHhAB"
                alt="High-end desktop PC motherboard and cooling components"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-5 -left-5 hidden sm:block rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                From {formatUsdAsPhp(79)} accessories to flagship builds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/40" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose PC Builder?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide everything you need to build the perfect computer, from individual components to complete custom builds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-background/80 feature-card" data-reveal>
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse Categories
            </h2>
            <p className="text-xl text-muted-foreground">
              Find the perfect components for your build
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Processors", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop" },
              { name: "Graphics Cards", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80&fit=crop" },
              { name: "Memory & Storage", image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80&fit=crop" },
              { name: "Motherboards", image: "https://www.google.com/imgres?q=motherboards&imgurl=https%3A%2F%2Fblog.udemy.com%2Fwp-content%2Fuploads%2F2021%2F09%2Fpexels-pok-rie-1432675-620x413.jpg&imgrefurl=https%3A%2F%2Fblog.udemy.com%2Fmotherboard-parts-and-functions%2F&docid=pCQIOT4VDsWdzM&tbnid=GkwNRUvx5n27hM&vet=12ahUKEwj70NaSromUAxUC3jgGHXzLPBMQnPAOegQIRxAB..i&w=620&h=413&hcb=2&ved=2ahUKEwj70NaSromUAxUC3jgGHXzLPBMQnPAOegQIRxAB" },
              { name: "Power Supplies", image: "https://www.google.com/imgres?q=power%20supply%20pics&imgurl=https%3A%2F%2Fstatic0.makeuseofimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2024%2F05%2Fperson-putting-power-supply-unit-into-pc-case.jpg&imgrefurl=https%3A%2F%2Fwww.makeuseof.com%2Fcables-in-pc-power-supply-explained%2F&docid=e6qU77Szr271mM&tbnid=RuImXyniA7RL6M&vet=12ahUKEwiplIbxrYmUAxWUxjgGHeBGDHQQnPAOegQIZxAB..i&w=2100&h=1400&hcb=2&ved=2ahUKEwiplIbxrYmUAxWUxjgGHeBGDHQQnPAOegQIZxAB" },
              { name: "Cases & Cooling", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80&fit=crop" }
            ].map((category, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer overflow-hidden border-0 bg-background/70 transition-all"
                onClick={() => navigateTo('products')}
                data-reveal
              >
                <div className="relative">
                  <ImageWithFallback
                    src={category.image}
                    alt={`${category.name} electronic components photo`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground" data-reveal>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Dream PC?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who've built their perfect computers with our help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigateTo('custom-pc')}>
              Start Building
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigateTo('products')}>
              Browse Products
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Quick ship for orders over {formatUsdAsPhp(freeShippingThresholdUsd)}
          </p>
        </div>
      </section>
    </div>
  );
}