import './add-user-to-convo.modal.scss';

import React, { useState } from 'react';

import { Modal } from '../../components/Modal/Modal';
import { api } from '../../lib/API';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export const AddUserToConvoModal = () => {
  const [users, setUsers] = useState<User[]>([]);

  const onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = async e => {
    setUsers(await api.searchUsers(e.target.value));
  };

  return <Modal className="add-user-to-convo">
    <h2>Add users to conversation</h2>
    <input onChange={onChange}type="text" placeholder="Search users..."/>
    <ul>
      {users.map(u => <li>
        {u.firstName} {u.lastName}
      </li>)}
    </ul>
  </Modal>;
};
