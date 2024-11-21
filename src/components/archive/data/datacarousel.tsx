import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import {
    getCurrentUsersGradeDistribution,
    getCurrentUsersVpoints,
} from "~/server/queries";
import { GradeAreaChart } from "./gradeareachart";
import { PointsRadialChart } from "./pointsradialchart";

interface GradeDistibution {
    grade: string;
    outdoors: number;
    indoors: number;
}

export async function DataCarousel() {
    const { outdoorvpoints, indoorvpoints, totalvpoints } =
        (await getCurrentUsersVpoints()) as {
            outdoorvpoints: number;
            indoorvpoints: number;
            totalvpoints: number;
        };
    const gradedistibution =
        (await getCurrentUsersGradeDistribution()) as GradeDistibution[];

    return (
        <div className="flex w-screen justify-center p-0">
            <Carousel className="w-full">
                <CarouselContent className="mx-10">
                    <CarouselItem className="-translate-x-7">
                        <PointsRadialChart
                            outdoor={outdoorvpoints}
                            indoor={indoorvpoints}
                            total={totalvpoints}
                        />
                    </CarouselItem>
                    <CarouselItem className="-translate-x-7">
                        <GradeAreaChart gradedistibution={gradedistibution} />
                    </CarouselItem>
                </CarouselContent>

                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>
        </div>
    );
}
