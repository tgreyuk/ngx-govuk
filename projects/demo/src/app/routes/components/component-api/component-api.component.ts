/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { JSONOutput } from 'typedoc';
import { CodeBlockComponent } from '../component-code/code-block.component';

@Component({
  selector: 'ngx-govuk-api',
  imports: [CodeBlockComponent],
  templateUrl: './component-api.component.html',
})
export class ComponentApiComponent {
  componentId = input<string>('');

  private documentation = httpResource<JSONOutput.ProjectReflection>(
    () => './assets/documentation.json',
  );

  // Recomputed when componentId changes: the router reuses the page when
  // moving from one component to another.
  docs = computed(() => {
    const json = this.documentation.value();
    if (!json) {
      return undefined;
    }
    const componentJson = json.children
      ?.filter((module) => module.name.startsWith(`${this.componentId()}/`))
      .map((component) => (component.children ? component.children[0] : null));

    const result = componentJson?.map((component) => {
      if (!component) {
        return { name: '' };
      }

      return {
        name: component.name,
        selector: component.comment?.blockTags?.find(
          (tag) => tag.tag === '@selector',
        )?.content[0].text,
        tag:
          component.sources &&
          component.sources[0].fileName.includes('directive')
            ? 'Directive'
            : 'Component',
        comments: this.getCommentSummary(component.comment),
        inputs: this.getInputs(component),
        methods: this.getMethods(component),
        properties: this.getProperties(component),
      };
    });
    return result?.sort((a, b) => a.name.localeCompare(b.name));
  });

  /**
   * One import for everything in this entry point, to paste alongside the
   * example's template. Wrapped one name per line when too long for one line,
   * as Prettier would.
   */
  importCode = computed(() => {
    const names = this.docs()
      ?.map((component) => component.name)
      .filter(Boolean);
    if (!names?.length) {
      return undefined;
    }
    const from = `from 'ngx-govuk/${this.componentId()}';`;
    const oneLine = `import { ${names.join(', ')} } ${from}`;
    return oneLine.length <= 80
      ? oneLine
      : `import {\n${names.map((name) => `  ${name},`).join('\n')}\n} ${from}`;
  });

  getInputs(component: JSONOutput.DeclarationReflection) {
    const inputs = component.children
      ?.filter(
        (member) =>
          member.type?.type === 'reference' &&
          member.type?.name === 'InputSignal',
      )
      .map((member) => {
        return {
          name: member.name,
          type: this.getInputType(member),
          comments: this.getCommentSummary(member.comment),
          required: member.comment?.blockTags?.find(
            (tag) => tag.tag === '@required',
          )
            ? 'Yes'
            : 'No',
          default:
            member.comment?.blockTags?.find(
              (tag) => tag.tag === '@initialValue',
            )?.content[0].text || '-',
        };
      });
    return inputs?.length ? inputs : null;
  }

  getInputType(member: JSONOutput.DeclarationReflection) {
    const type = (member.type as JSONOutput.ReferenceType)?.typeArguments
      ?.map((arg: any) => {
        if (arg.type === 'union') {
          return arg.types
            .filter(
              (argType: any) =>
                argType.name !== 'undefined' || Boolean(argType.value),
            )
            .map((argType: any) => argType.name || `"${argType.value}"`)
            .join(' | ');
        }
        return arg.name;
      })
      .join(', ');
    return type;
  }

  getMethods(component: JSONOutput.DeclarationReflection) {
    const methods = component.children
      ?.filter((member) => member.kind === 2048)
      .map((member) => {
        const signature = member.signatures ? member.signatures[0] : null;
        return {
          name: signature?.name,
          comments: this.getCommentSummary(signature?.comment),
        };
      });
    return methods?.length ? methods : null;
  }

  getProperties(component: JSONOutput.DeclarationReflection) {
    const properties = component.children
      ?.filter(
        (member) =>
          member.type?.type === 'reference' &&
          member.type?.name === 'WritableSignal',
      )
      .map((member) => {
        return {
          name: member?.name,
          comments: this.getCommentSummary(member.comment),
          type: `WritableSignal<${(
            member.type as JSONOutput.ReferenceType
          )?.typeArguments
            ?.map((arg: any) => arg.name)
            .join(', ')}>`,
        };
      });
    return properties?.length ? properties : null;
  }

  getCommentSummary(comment?: JSONOutput.Comment) {
    if (!comment) {
      return [];
    }
    return comment?.summary[0].text.split('\n\n');
  }
}
