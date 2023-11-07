import { faChevronDown, faChevronRight, faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FolderIcon = ({ isOpen }: { isOpen: boolean }) =>
  isOpen ? (
    <span className="inline-block">
      <span className="icon">
        <FontAwesomeIcon icon={faChevronDown} />
      </span>
      <span className="icon icon-folder ">
        <FontAwesomeIcon icon={faFolderOpen} />
      </span>
    </span>
  ) : (
    <span className="inline-block">
      <span className="icon">
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
      <span className="icon icon-folder">
        <FontAwesomeIcon icon={faFolder} />
      </span>
    </span>
  );

export const FileIcon = ({ req }: { req?: string | number | null }) => {
  return null
};