import React, {useState} from 'react'
import '../styling/TodoList.css'
import {Checkbox} from '@mui/material'

export default function TodoList() {
  const [checked, setChecked] = useState(false)
  const handleChange = () => {

  }
  return (
    <div className='todo-list'>
        <div className='todo-subcontainer'>
            <Checkbox
                checked={checked}
                onChange={handleChange}
            />
            <img 
                className="todo-icon"
                src="https://img-getpocket.cdn.mozilla.net/404x202/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc9af2f1d-e839-4f99-b9a9-9c955e5173cf.jpeg" 
            />
          <h4>title</h4>
        </div>
        <div className='todo-subcontainer-2'>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
        </div>
    </div>
  )
}
