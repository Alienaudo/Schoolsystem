import db from "./db.js";
import * as Subject from "./seeds/01_subjact.js";
import * as Teacher from "./seeds/02_teacher.js";
import * as Student from "./seeds/03_student.js";

try {

    async function populate(): Promise<void> {

        await Subject.seed(db);
        await Teacher.seed(db);
        await Student.seed(db);

    };

    populate();

} catch (error) {
    console.error(error);

}
