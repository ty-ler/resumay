import { Input } from '@/components/ui/input';
import { useProfileStore } from '@/lib/stores/profile.store';
import { ChangeEvent } from 'react';
import EditorFormField from '../EditorFormField';
import EditorSection from '../EditorSection';

export default function EditorProfile() {
  const store = useProfileStore();
  const profile = useProfileStore((state) => state.profile);

  const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    store.setFullName(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    store.setEmail(e.target.value);
  };

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    store.setPhone(e.target.value);
  };

  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    store.setLocation(e.target.value);
  };

  const handleChangeLinkUrl = (e: ChangeEvent<HTMLInputElement>) => {
    store.setLinkUrl(e.target.value);
  };

  return (
    <EditorSection title="Profile">
      <div className="flex flex-col gap-4">
        <EditorFormField label="Full Name" htmlFor="full-name">
          <Input
            id="full-name"
            value={profile.fullName}
            onChange={handleChangeFullName}
          />
        </EditorFormField>

        <EditorFormField label="Email" htmlFor="email">
          <Input
            id="email"
            value={profile.email}
            onChange={handleChangeEmail}
          />
        </EditorFormField>

        <EditorFormField label="Phone Number" htmlFor="phone">
          <Input
            id="phone"
            value={profile.phone}
            onChange={handleChangePhone}
          />
        </EditorFormField>

        <EditorFormField label="Location" htmlFor="location">
          <Input
            id="location"
            value={profile.location}
            onChange={handleChangeLocation}
          />
        </EditorFormField>

        <EditorFormField label="Link URL" htmlFor="link-url">
          <Input
            id="link-url"
            value={profile.linkUrl}
            onChange={handleChangeLinkUrl}
          />
        </EditorFormField>
      </div>
    </EditorSection>
  );
}
