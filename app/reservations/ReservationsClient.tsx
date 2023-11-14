'use client';
import {toast} from 'react-hot-toast'
import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeReservation, SafeUser } from '../types';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCallback, useState } from 'react';
interface ReservationsClientProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser  | null,
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
   const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
      <Heading 
       title='Reservations'
       subtitle='Bookings on your Properties'
      />
      </Container>
  )
}

export default ReservationsClient