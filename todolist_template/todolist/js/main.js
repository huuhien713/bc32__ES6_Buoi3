let todoList = JSON.parse(window.localStorage.getItem('todoList')) || [];

let todoComplete = JSON.parse(window.localStorage.getItem('todoComplete')) || [];

displayToDoList(todoList);

displayToDoComplete(todoComplete);

// btn thêm việc cần làm
document.getElementById('addItem').addEventListener('click', (e) => {
    // lấy giá trị đầu vào
    const input = document.getElementById('newTask').value;
    if (!validation(input)) {
        alert('vui lòng nhập việc cần làm trước khi thêm');
    } 
    else {
        // add vảo mảng
        todoList = [ ...todoList, input]; // todoList.push(input)
        console.log(todoList)
        // lưu vào localStorage
        window.localStorage.setItem('todoList', JSON.stringify(todoList))
        displayToDoList(todoList)
    }
    // reset input todo
    document.getElementById('newTask').value = '';
})
// hiển thị list việc cần làm
function displayToDoList(todoList) {
    const content = todoList.reduce((result, todo, index) => {
        return result + `
        <li class="buttons"> ${todo}
            <div class="buttons">
                <button class="remove">
                    <i class="fa-solid fa-trash-can" data-type="remove" data-index="${index}"></i>
                </button>
                <button class="complete">
                    <i class="fa-regular fa-circle-check" data-type="complete" data-index="${index}"></i>
                </button>
            </div>
        </li>`
    }, '')
    document.getElementById('todo').innerHTML = content;
}
// hiển thị list việc đã làm xong
function displayToDoComplete(todoComplete) {
    const content = todoComplete.reduce((result, todo, index) => {
        return result + `
        <li class="buttons"> ${todo}
            <div class="buttons">
                <button class="remove">
                    <i class="fa-solid fa-trash-can" data-type="remove" data-index="${index}"></i>
                </button>
                <button class="complete">
                    <i class="fa-regular fa-circle-check" data-type="complete" data-index="${index}"></i>
                </button>
            </div>
        </li>`
    }, '')
    document.getElementById('completed').innerHTML = content;
}
// xóa việc
document.getElementById('todo').addEventListener('click', (e) => {
    // bắt sự kiện ở ul todo
    const elementType = e.target.getAttribute('data-type');
    const stampIndex = e.target.getAttribute('data-index');
    if (elementType === 'remove') {
        // chạy hàm xóa, truyền vào mảng todo
        removeToDo(stampIndex, todoList);
        // lưu vào localStorage
        window.localStorage.setItem('todoList', JSON.stringify(todoList));
        // hiển thị ra màn hình
        displayToDoList(todoList);
        console.log(todoList)
    } else if (elementType === 'complete') {
        // chạy hàm completTodo, truyền vào mảng todo
        completeTodo(stampIndex, todoList);
        console.log(todoList)
        console.log(todoComplete)
    }

})
// đánh dấu việc đã làm xong
document.getElementById('completed').addEventListener('click', (e) => {
    // bắt sự kiện ở ul completed
    const elementType = e.target.getAttribute('data-type');
    const stampIndex = e.target.getAttribute('data-index');
    if (elementType === 'remove') {
        // chạy hàm xóa, truyền vào mảng complete
        removeToDo(stampIndex, todoComplete);
        // lưu vào localStorage
        window.localStorage.setItem('todoComplete', JSON.stringify(todoComplete));
        // hiển thị ra màn hình
        displayToDoComplete(todoComplete);
        console.log(todoComplete)
    }
})

document.getElementById('two').addEventListener('click', (e) => {
    todoList.sort();
    todoComplete.sort();
    // hiển thị ra màn hình
    displayToDoList(todoList)
    displayToDoComplete(todoComplete);
    console.log(todoList)
    console.log(todoComplete)
})
document.getElementById('three').addEventListener('click', (e) => {
    todoList.reverse();
    todoComplete.reverse();
    // hiển thị ra màn hình
    displayToDoList(todoList)
    displayToDoComplete(todoComplete);
    console.log(todoList)
    console.log(todoComplete)
})

function removeToDo(stampIndex, array) {
    // tìm todo có index === stampIndex
    const stamp = array.findIndex((todo, index) => {
        return index === +stampIndex;
    })
    if(stamp !== -1) {
        // xóa index tìm đc
        array.splice(stamp, 1);
    }   
}

function completeTodo(stampIndex) {
    // tìm todo có index === stampIndex
    let stamp = todoList.findIndex((todo, index) => {
        return index === +stampIndex;
    })
    if(stamp !== -1) {
        // cắt index tìm đc ra 1 mảng mới
        let stamp2 = todoList.slice(stamp, stamp+1);
        // xóa index tìm đc ra  khỏi mảng cũ
        todoList.splice(stamp, 1);
        // lưu vào localStorage
        window.localStorage.setItem('todoList', JSON.stringify(todoList))
        // dùng destructuring bóc tách stamp2 truyền vào todocomplete
        todoComplete = [...todoComplete, ...stamp2];
        // lưu vào localStorage
        window.localStorage.setItem('todoComplete', JSON.stringify(todoComplete))
    } 
    // hiển thị ra màn hình
    displayToDoList(todoList)
    displayToDoComplete(todoComplete);
}

function validation(input) {
    if (input != '') {
        return true;
    } else {
        return false;
    }
}

window.addEventListener('keypress', (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
        const input = document.getElementById('newTask').value;
        if (!validation(input)) {
            alert('vui lòng nhập việc cần làm trước khi thêm');
        } 
        else {
            // add vảo mảng
            todoList = [ ...todoList, input]; // todoList.push(input)
            console.log(todoList)
            // lưu vào localStorage
            window.localStorage.setItem('todoList', JSON.stringify(todoList))
            displayToDoList(todoList)
        }
        // reset input todo
        document.getElementById('newTask').value = '';
    } else return
})
