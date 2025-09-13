import AvatarSelection from '../AvatarSelection';
import { useState } from 'react';
import type { Avatar } from '@shared/schema';

export default function AvatarSelectionExample() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  
  return (
    <AvatarSelection 
      selectedAvatar={selectedAvatar}
      onAvatarSelect={setSelectedAvatar}
      onNext={() => console.log('Next clicked with avatar:', selectedAvatar)}
    />
  );
}