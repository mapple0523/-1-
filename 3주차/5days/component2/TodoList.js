import LiItem from './LiItem';

function TodoList({ TodoList1, deleteItem, updateItem }) {
    return (
        <div>
            <ul>{
                TodoList1.map(function (item, name,index) {
                    return <LiItem
                        key={item.no}
                        item={item}
                        name={name}
                        deleteItem={deleteItem}
                        updateItem={updateItem} />
                })}
            </ul>
        </div>
    )
}

export default TodoList