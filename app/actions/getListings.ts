import prisma from "../libs/prismadb";
  export interface IListingParams {
    userId?: string;
  }

export default async function getListings(
    params: IListingParams
) {
    const { userId } = params;
    let query: any = {};
    if (userId) {
        query.userId = userId;
    }
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc",
            },
        }
        );
       const safeListings = listings.map((listing) => ({
        ...listing,
        createdAt: listing.createdAt.toISOString(),

       }));

       return safeListings;
    } catch (error : any) {
        throw new Error(error.message);
    }
}