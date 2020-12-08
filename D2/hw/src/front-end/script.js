function loadAllStudents(){
    fetch("http://127.0.0.1:3003/students/")
    .then(response => response.json())
    .then(apiResponse => {

        let studentsDiv = document.querySelector('.studentsList');
        let newRow = document.createElement('div');

        let students = apiResponse;
        for(let i=0; i<students.length; i++){
            let student = students[i];
            newRow.innerHTML += `
                <p>Name: ${student.name}, surname: ${student.surname}, email: ${student.email}, birthday: ${student.birthday}</p>
            `
        }

        studentsDiv.innerHTML += `<br>`;

        studentsDiv.appendChild(newRow);
    })
    .catch(err => {
        console.error(err);
    });
}

function loadFilteredStudents(){
    let id = document.getElementById("studentId").value;
    fetch("http://127.0.0.1:3003/students/"+id)
    .then(response => response.json())
    .then(apiResponse => {

        let studentsDiv = document.querySelector('.filteredStudentsList');
        let newRow = document.createElement('div');

        let students = apiResponse;
        for(let i=0; i<students.length; i++){
            let student = students[i];
            newRow.innerHTML += `
                <p>Name: ${student.name}, surname: ${student.surname}, email: ${student.email}, birthday: ${student.birthday}</p>
            `
        }

        studentsDiv.innerHTML += `<br>`;

        studentsDiv.appendChild(newRow);
    })
    .catch(err => {
        console.error(err);
    });
}

window.onload = function(){

    loadAllStudents();
    
    
}
