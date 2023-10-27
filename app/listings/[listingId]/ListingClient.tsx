'use client'
import Container from '@/app/components/Container';
import { categories } from '@/app/components/Navbar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import {Reservation} from '@prisma/client';
import { useMemo } from 'react';
import ListingHead from '../../components/listings/ListingHead';
import ListingInfo from '../../components/listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModel';

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
         user: SafeUser;
}
    currentUser?: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({
    listing,currentUser,reservations=[]
}) => {
    const category = useMemo(() => {
        const loginModal = useLoginModal();
        return categories
    },[])
  return (
     <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient