
import React from 'react';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    quote: "TaskTide has transformed how my team manages projects. The kanban interface is intuitive and the statistics feature helps me keep stakeholders informed.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Developer",
    quote: "As a developer, I love how TaskTide integrates with my workflow. The to-do list feature keeps me on track, and I can easily show my progress in team meetings.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    quote: "Our marketing team has improved productivity by 30% since implementing TaskTide. The customizable views help each team member work how they prefer.",
    rating: 4
  },
  {
    id: 4,
    name: "David Park",
    role: "Freelance Designer",
    quote: "TaskTide helps me juggle multiple client projects simultaneously. The clean interface and powerful features are exactly what I needed.",
    rating: 5
  }
];

const TestimonialsCarousel = () => {
  return (
    <div className="mt-16 mb-12">
      <h2 className="text-2xl font-bold text-center mb-2">What Our Users Say</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Discover how TaskTide has helped professionals across industries
      </p>
      
      <div className="mx-auto max-w-5xl">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border border-border bg-card/60 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gray-300" />
                      ))}
                    </div>
                    <p className="text-sm italic mb-4">"{testimonial.quote}"</p>
                    <div className="flex flex-col">
                      <span className="font-semibold">{testimonial.name}</span>
                      <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative -left-0 right-auto" />
            <CarouselNext className="relative -right-0 left-auto" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
