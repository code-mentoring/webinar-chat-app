import './add-user-to-convo.modal.scss';

import React, { useState } from 'react';

import { Modal } from '../../components/Modal/Modal';
import { api } from '../../lib/API';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}
interface AddUserToConvoModalProps {
  onClose(): void;
  convoID: string;
}

export const AddUserToConvoModal: React.FC<AddUserToConvoModalProps> = ({
  convoID,
  onClose
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = async e => {
    setUsers(await api.searchUsers(e.target.value));
  };

  const addUser = async (userId: string) => {
    await api.addUserToConvo(convoID, userId);
  };

  return <Modal
    onClose={onClose}
    title="Add users to conversation"
    className="add-user-to-convo"
  >
    <input onChange={onChange} type="text" placeholder="Search users..." />
    <ul>
      {users.map(u => <li onClick={() => addUser(u.id)}>
        {u.firstName} {u.lastName}
      </li>)}
    </ul>
  </Modal>;
};
