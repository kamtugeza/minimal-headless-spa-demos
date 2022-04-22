declare module '@magnolia/react-editor' {
	import type { EditorContextHelper as ECH, PersonalizationService as PS } from '@magnolia/template-annotations'
	import type { Context, Component, FunctionComponent} from "react";
	import { PureComponent } from "react";

	export class EditablePage extends PureComponent<{
    config?: {
      componentMappings: Record<string, Component<unknown, unknown> | FunctionComponent<unknown>>;
    };
    content?: Record<string, unknown>;
    templateDefinitions?: Record<string, unknown>;
    templateAnnotations?: Record<string, unknown>;
		}, { selectedComponentVariants: null }> {}

	export class EditableArea extends PureComponent<{
		className?: string;
		content: Record<string, unknown>;
		customView?: JSX.Element;
		elementType?: any;
		parentTemplateId?: string;
		}> {}

	export class EditableComponent extends PureComponent<{
		content: Record<string, unknown>;
		}> {}

	export class EditableComment extends PureComponent<{
    annotation: string;
    callback?: Function;
    alwaysRender?: boolean;
		}> {}

	export const EditorContext: Context<{
    templateDefinitions: Record<string, unknown>;
    templateAnnotations: Record<string, unknown>;
    componentMappings: Record<string, JSX.Element>;
    content: Record<string, unknown>;
    isDevMode: boolean;
	}>;

	/**
	 * @deprecated RendererContext is deprecated. Use EditorContext instead
	 */
	export const RendererContext: typeof EditorContext;

	export const EditorContextHelper: typeof ECH;

	/**
	 * TODO: fill in this missing type
	 */
	export const ComponentHelper: any;

	export const PersonalizationService: typeof PS;
}
