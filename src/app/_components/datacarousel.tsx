import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import { GradeAreaChart } from "./gradeareachart";
import { getCurrentUsersClimbs } from "~/server/queries";

export async function DataCarousel() {
    const climbs = await getCurrentUsersClimbs();

    return (
        <div className="flex w-full justify-center">
            <Carousel className="w-full">
                <CarouselContent>
                    <CarouselItem className="w-3/4">
                        <GradeAreaChart climbs={climbs} />
                    </CarouselItem>
                    <CarouselItem>...</CarouselItem>
                    <CarouselItem>...</CarouselItem>
                </CarouselContent>

                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>
        </div>
    );
}
