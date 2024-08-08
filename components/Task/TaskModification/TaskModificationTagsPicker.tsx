import Tag from "@/components/ui/Tag";
import Tags from "@/utils/store/Tags";
import { ITask } from "@/utils/store/Tasks";
import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction } from "react";
import { FaCheck } from "react-icons/fa";
type Props = { taskForm: ITask; setTaskForm: Dispatch<SetStateAction<ITask>> };

const TaskModificationTagsPicker = observer((props: Props) => {
  return (
    <div className="flex flex-wrap border gap-2 w-full p-2 bg-zinc-950 rounded-lg border-zinc-800">
      {Tags.tags.map((tag) => {
        return (
          <button
            key={tag.id}
            className="rounded-lg flex items-center justify-center"
            style={{ backgroundColor: tag.color }}
            onClick={(e) =>
              props.setTaskForm({
                ...props.taskForm,
                tags: props.taskForm.tags.includes(tag.id)
                  ? props.taskForm.tags.filter((el) => el != tag.id)
                  : [...props.taskForm.tags, tag.id],
              })
            }
          >
            {props.taskForm.tags.includes(tag.id) && (
              <FaCheck fill="#fff" size={14} className="ml-2" />
            )}
            <Tag tag={tag} />
          </button>
        );
      })}
    </div>
  );
});

export default TaskModificationTagsPicker;
