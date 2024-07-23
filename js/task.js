(function (window) {
	/* Task Object */
	let taskno = 0;

	// Function to save taskno to local storage
	function saveTasknoToLocalStorage() {
		localStorage.setItem('taskno', taskno);
	}

	var Task = {
		createTask: function (taskTitle, completed) {
			function createLiElem(title, completed) {
				let li = document.createElement("li");
				let taskTitle = document.createTextNode(title);
				li.appendChild(taskTitle);
				li.dataset.target = title;
				li.appendChild(Task.CloseBtn.createCloseBtn());
				if (completed) li.classList.add("checked");
				return li;
			}
			return createLiElem(taskTitle, completed);
		},
		
		addTask: function (todoList, taskTitle, completed = false) {
			todoList.appendChild(Task.createTask(taskTitle, completed));
		},
		CloseBtn: {
			createCloseBtn: function () {
				let span = document.createElement("SPAN");
				let txt = document.createTextNode("\u2713");
				span.className = "close";
				span.appendChild(txt);
				span.addEventListener("click", Task.CloseBtn.closeClickHandler);

				return span;
			},
			closeClickHandler: function () {
				const li = this.parentElement;
				const taskTitle = li.getAttribute("data-target");
				// Remove from localStorage
				let tasksData = JSON.parse(localStorage.getItem("todo"));
				for (let i = 0; i < tasksData.length; i++) {
					if (taskTitle == tasksData[i].title) {
						let lastIndex = tasksData.length - 1;
						tasksData[i] = tasksData[lastIndex];
						tasksData.pop();
						localStorage.setItem("todo", JSON.stringify(tasksData));
						break;
					}
				}

				li.style.display = "none";
				swal("Done!", "Your Task Completed!", "success");
				taskno = taskno + 1;
				saveTasknoToLocalStorage();
				
				let timer = setTimeout(() => {
					sweetAlert.close();
				}, 1200);

				let taskname;
				if (taskno === 0) {
					taskname = "Complete task to get in league";
				} else if (taskno <= 2) {
					taskname = "Silver";
				} else if (taskno <= 5) {
					taskname = "Gold";
				} else {
					taskname = "GOD";
				}		
				document.getElementById('rank').innerHTML = "League : " + taskno;
			}
		}
	};

	document.addEventListener("DOMContentLoaded", function() {
		const savedTaskno = localStorage.getItem('taskno');
		if (savedTaskno !== null) {
			taskno = parseInt(savedTaskno, 10);
		}
		const resetButton = document.querySelector(".rstbtn");
		resetButton.addEventListener("click", function() {
			taskno = 0;
			saveTasknoToLocalStorage();
			// console.log("TaskNo reset to 0");
			updateOutput();
			function updateOutput() {
				// update the output element with the new value of taskno
				document.getElementById('rank').innerHTML = "League : " + taskno;
			  }
		});
	});
	
	window.Task = Task;
})(window);
