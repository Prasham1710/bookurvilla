import { categories } from '@/app/components/Navbar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import {Reservation} from '@prisma/client';
import { useMemo } from 'react';

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
         user: SafeUser;
}
    currentUser?: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({
    listing,currentUser,reservations
}) => {
    const category = useMemo(() => {
        return categories
    },[])
  return (
    <div>ListingClient</div>
  )
}

export default ListingClient