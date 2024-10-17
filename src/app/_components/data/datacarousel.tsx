import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import { GradeAreaChart } from "./gradeareachart";
import { getCurrentUsersClimbs } from "~/server/queries";
import { PointsRadialChart } from "./pointsradialchart";

export async function DataCarousel() {
    const climbs = await getCurrentUsersClimbs();

    return (
        <div className="flex w-screen justify-center p-0">
            <Carousel className="w-full">
                <CarouselContent className="mx-6">
                    <CarouselItem>
                        <PointsRadialChart climbs={climbs} />
                    </CarouselItem>
                    <CarouselItem>
                        <GradeAreaChart climbs={climbs} />
                    </CarouselItem>
                </CarouselContent>

                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>
        </div>
    );
}
