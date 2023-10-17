'use client'
import useRentModal from '@/app/hooks/useRentModel'
import Modal from './Modal'
import { useMemo, useState } from 'react'
import Heading from '../Heading'
import { categories } from '../Navbar/Categories'
import CateoryInput from '../Inputs/CateoryInput'
import { FieldValues, useForm,SubmitHandler } from 'react-hook-form'
import CountrySelect from '../Inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../Inputs/Counter'
import ImageUpload from '../Inputs/ImageUpload'
import Input from '../Inputs/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

 enum STEPS{
  CATEGORY =0 ,
  LOCATION = 1 ,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4 ,
  PRICE = 5,
 }

const RentModal = () => {
  const router = useRouter();
    const rentModal= useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY); 
    const [isLoading, setIsLoading] = useState(false);

    const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
    const Map = useMemo(() => dynamic(()=> import(('../Map')), {ssr: false}), [location])
    const setCustomValue = (id: string, value: any) => {
      setValue(id, value,{
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
    const onBack = () => {
      setStep((value) => value - 1);
    }
    const onNext = () => {
      setStep((value) => value + 1);
    }

    const onSubmit : SubmitHandler<FieldValues> =  (data) => {
      if (step !== STEPS.PRICE) {
        return onNext();
      }
      setIsLoading(true);

      axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created successfully');
        router.refresh
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();

      })
      .catch(() => {
        toast.error('Something went wrong');
      }).finally(() => {
        setIsLoading(false);
      })
    }



    const actionLabel = useMemo(() => {
      if (step === STEPS.PRICE) {
        return 'Create';
      }

      return 'Next';
    }, [step]);
     const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.CATEGORY) {
        return undefined;
      }

      return 'Back';
    }, [step]); 

    let bodyContent = (
      <div className='flex flex-col gap-8'>
       <Heading
          title = 'Which of these best describes your place?'
          subtitle = 'Pick a category '
        />   
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto  '>
          {categories.map((item) => (
            <div key={item.label} className='cols-span-1'>
              <CateoryInput
              onClick={(category) => setCustomValue('category', category) }
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
              />
              </div> 
          ))}
        </div>
       </div>
    )

     if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />
        <Map center={location?.latlng} />
      </div>

    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle='what amenities do you have'/>
          <Counter title='Guests' 
                    subtitle='how many guests do you allow '
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount',value)}/>
          <hr/>
          <Counter title='Rooms' 
                    subtitle='how many rooms do you have '
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount',value)}/>
          <hr/>
          <Counter title='bathrooms' 
                    subtitle='how many bathrooms do  you have? '
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount',value)}/>
          
      </div>
    )
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title="Upload some photos"
          subtitle="Showcase your place to guests"
          />
          <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc',value)}
          />
          </div>
    )
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title="how would you describe your place?"
          subtitle="short and sweet is the way to go!"
          />
         <Input 
         id='title'
         label='Title'
         disabled={isLoading}
         register={register}
         errors={errors}
         required
          />
          <hr/>
          <Input 
         id='description'
         label='Description'
         disabled={isLoading}
         register={register}
         errors={errors}
         required
          />
          </div>
    )
  }

  if (step === STEPS.PRICE) { 
    bodyContent =(
      <div className='flex flex-col gap-8'>
        <Heading
          title='Noew let`s set up your price'
          subtitle='how much do you want to charge?'
          />
          <Input 
          id='price'
          label='Price'
          type='number'
          formatPrice
          disabled={isLoading}
          register={register}
          errors={errors}
          required/>
          </div>
    )
  }
  return (
    <Modal
    title='Airbnb my home'
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    isOpen={rentModal.isOpen}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    body={bodyContent}
    />

  )
}

export default RentModal