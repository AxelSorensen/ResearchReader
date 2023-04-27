import { HiOutlineCheckCircle, HiOutlineTrash, HiOutlineXCircle } from "react-icons/hi2";
import { useRef, forwardRef } from "react";

const ContextMenu = ({ position, setMenu, deletePaper, selectedPaper, handleRead }, ref) => {

  const actions = [{ id: 0, name: selectedPaper.read ? 'Mark as unread' : 'Mark as read', icon: selectedPaper.read ? <HiOutlineXCircle size={22}/> : <HiOutlineCheckCircle size={22} />  }, { id: 1, name: 'Delete', icon: <HiOutlineTrash size={20} />, color: 'red' }]

  const handleClick = (id) => {
    switch (id) {
      case 0:
        handleRead()
        break;
      case 1:
        deletePaper(selectedPaper.id);
        break;
    }
    setMenu(false)
  }

  const returnColor = (color) => {
    switch (color) {
      case 'red':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div ref={ref} className="absolute z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-xs py-1" style={{ top: position.y, left: position.x }}>
      {actions.map(action => (
        <div onClick={() => handleClick(action.id)} key={action.name} className={`flex items-center pl-2 text-${action.color}-300 block px-4 py-2 text-sm hover:bg-gray-200 ${returnColor(action.color)} gap-4 cursor-pointer`}>
          {action.icon}
          <p>{action.name}</p>
        </div>

      ))}

    </div>
  );
}

export default forwardRef(ContextMenu)