# vr_rest_ai

#### students/
    register {id, name, class_id, teacher} :: post
    info {id} :: get
    list {class_id} :: get
    
#### questions/
    add {id, exam, qtext, qanswers, qgrade} :: post
    get {exam} :: get
    
#### exams/
    add {id, teacher, module} :: post
    get {teacher} :: get
   
#### modules/
    add {id, user_id, module, date} :: post
    list {user_id} :: get
    
#### teachers/
    register {id, email, password, name} :: post
    login {email, password} :: get
    
    
