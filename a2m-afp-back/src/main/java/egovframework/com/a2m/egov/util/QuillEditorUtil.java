package egovframework.com.a2m.egov.util;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import egovframework.com.a2m.egov.constants.RegexContants;

@Component
public class QuillEditorUtil {
	
	@Autowired
	private Environment env;
	
	private static String viewImageUrl;
	
	@PostConstruct
	public void init() {
		viewImageUrl = env.getProperty("editor.view.image.url");
	}
	
	public static String handleImageFromEditorContent(String editorContent) throws IOException {
		
        Pattern pattern = Pattern.compile(RegexContants.IMG_TAG);
        Matcher matcher = pattern.matcher(editorContent);
        
        while (matcher.find()) {
            String imgStr = matcher.group();
            Pattern patternSrcImg = Pattern.compile(RegexContants.SRC_IMG);
            Matcher matcherSrcImg = patternSrcImg.matcher(imgStr);
            if (matcherSrcImg.find()) {
            	String srcContent = matcherSrcImg.group().substring(5, matcherSrcImg.group().length()-1);
            	String fileName = FileBase64Util.getFileName(srcContent);
            	String base64Content = srcContent.split(",")[1];
            	FileBase64Util.saveBase64ToFile(fileName, base64Content);
            	editorContent = editorContent.replace(srcContent, viewImageUrl + "/" + fileName);
            }
		}
        
        return editorContent;
	}
	
}
