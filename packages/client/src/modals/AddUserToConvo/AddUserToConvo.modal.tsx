import React from 'react';

import { Modal } from '../../components/Modal/Modal';
import { api } from '../../lib/API';

export const AddUserToConvoModal = () => {

  const onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = async e => {
    const res = await api.searchUsers(e.target.value);
    console.log(res);
  };

  return <Modal>
    <h2>Add users to conversation</h2>
    <input onChange={onChange}type="text" placeholder="Search users..."/>
  </Modal>;
};
