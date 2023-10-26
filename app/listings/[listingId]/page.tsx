import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListinsById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
    listingId?: string;
}
const ListingPage =async ({params}:{ params: IParams}) =>{
    const listing = await getListingsById(params)

    const currentUser = await getCurrentUser();
    if (!listing){
        return(
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
        <ListingClient
            listing={listing}
            currentUser={currentUser}
            
        />
        </ClientOnly>
    );
}
export default ListingPage;