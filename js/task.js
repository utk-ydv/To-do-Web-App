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
				if(taskno == 0){
					taskname = "Complete task to Enter in League";
				}else if (taskno >= 0 && taskno <= 5) {
					taskname = "Novice";
				} else if (taskno >= 6 && taskno <= 15) {
					taskname = "Apprentice";
				} else if (taskno >= 16 && taskno <= 30) {
					taskname = "Journeyman";
				} else if (taskno >= 31 && taskno <= 50) {
					taskname = "Adept";
				} else if (taskno >= 51 && taskno <= 75) {
					taskname = "Expert";
				} else if (taskno >= 76 && taskno <= 105) {
					taskname = "Veteran";
				} else if (taskno >= 106 && taskno <= 140) {
					taskname = "Master";
				} else if (taskno >= 141 && taskno <= 180) {
					taskname = "Grandmaster";
				} else if (taskno >= 181 && taskno <= 225) {
					taskname = "Champion";
				} else if (taskno >= 226 && taskno <= 275) {
					taskname = "Legend";
				} else if (taskno >= 276 && taskno <= 330) {
					taskname = "Mythic";
				} else if (taskno >= 331 && taskno <= 390) {
					taskname = "Heroic";
				} else if (taskno >= 391 && taskno <= 455) {
					taskname = "Epic";
				} else if (taskno >= 456 && taskno <= 500) {
					taskname = "Immortal";
				} else {
					taskname = "Unknown"; // Default case if task number does not fall into any defined range
				}
				document.getElementById('rank').innerHTML = "League : " + taskname;
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
				document.getElementById('rank').innerHTML = "League : " + "Complete task to Enter in League";
			  }
		});
	});
	
	window.Task = Task;
})(window);
