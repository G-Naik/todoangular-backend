const {Router} = require("express")
const { getToDo, saveToDo, updateToDo, deleteTodo } = require("../contorllers/todo")

const router = Router()

router.get('/',getToDo)
router.post('/save',saveToDo)
router.put('/update',updateToDo)
router.delete('/delete',deleteTodo)


module.exports = router;