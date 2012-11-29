/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext
		.define(
				'DIRAC.view.Notepad',
				{
					extend : 'Ext.ux.desktop.Module',

					requires : [ 'Ext.form.field.HtmlEditor'
					// 'Ext.form.field.TextArea'
					],
					controllers:[],

					init : function(parentApp) {
						this.app = parentApp;
						this.launcher = {
							text : 'Notepad',
							iconCls : 'notepad'
						};
						this.editor = new Ext.form.field.HtmlEditor({value : [
						    												'Some <b>rich</b> <font color="red">text</font> goes <u>here</u><br>',
						    												'Give it a try!' ].join('')
						    										});
					},
					
					loadState: function(data){
						
						var me=this;
						me.editor.setValue(data["text"]); 
						
					},
					
					getStateData:function(){
						
						var me=this;
						return {text:me.editor.getValue()};
						
					},
					createWindow : function() {
						
						var me = this;
						
						var desktop = this.app.getDesktop();
							
						win = desktop
								.createWindow({
									title : 'Notepad',
									width : 600,
									height : 400,
									iconCls : 'notepad',
									animCollapse : false,
									border : false,
									// defaultFocus: 'notepad-editor',
									// EXTJSIV-1300

									// IE has a bug where it will keep the
									// iframe's background visible when the
									// window
									// is set to visibility:hidden. Hiding the
									// window via position offsets instead gets
									// around this bug.
									hideMode : 'offsets',

									layout : 'fit',

									items : [ me.editor ]
								});

						return win;
					}
				});