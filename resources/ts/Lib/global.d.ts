import Vue from "vue";
import {GlobalApplication} from "./GlobalApplication";
import {LoDashStatic} from "lodash";


declare global {
	interface Window {
		// Libraries
		jQuery: JQueryStatic;
		_: LoDashStatic;

		// Application
		App: GlobalApplication;
	}
}