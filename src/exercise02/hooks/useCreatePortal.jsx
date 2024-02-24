import {useEffect} from "react";
import _ from "lodash";

const useCreatePortal = (modalId = 'portal', tagName = 'div') => {
    const portalRoot = document.getElementById(modalId);
    const portalElement = document.createElement(tagName);

    useEffect(() => {
        if (_.isNull(portalRoot)) {
            portalElement.setAttribute('id', modalId);
            document.body.appendChild(portalElement);
        }

        return () => {
            if (!_.isNull(portalRoot)) {
                document.body.removeChild(portalRoot);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalId, tagName])

    return {modalId, portalRoot}
}

export default useCreatePortal
