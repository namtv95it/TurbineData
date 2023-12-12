package egovframework.a2m.egov.util;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

/**
 * @author tiennd
 *
 * @created May 22, 2023
 */
public class ResizeImage {

	public static void handle(Path source, Path target, Integer width, Integer height)
			throws FileNotFoundException, IOException {
		try (InputStream is = new FileInputStream(source.toFile())) {
			resize(is, target, width, height);
		}
	}

	private static void resize(InputStream input, Path target, Integer width, Integer height) throws IOException {
		// read an image to BufferedImage for processing
		BufferedImage originalImage = ImageIO.read(input);

		int original_width = originalImage.getWidth();
		int original_height = originalImage.getHeight();
		int new_width = original_width;
		int new_height = original_height;

		// first check if we need to scale width
		if (width != null && original_width > width) {
			// scale width to fit
			new_width = width;
			// scale height to maintain aspect ratio
			new_height = (new_width * original_height) / original_width;
		}

		// then check if we need to scale even with the new height
		if (height != null && new_height > height) {
			// scale height to fit instead
			new_height = height;
			// scale width to maintain aspect ratio
			new_width = (new_height * original_width) / original_height;
		}

		// get file extension
		String s = target.getFileName().toString();
		String fileExtension = s.substring(s.lastIndexOf(".") + 1);

		// create a new BufferedImage for drawing
		BufferedImage newResizedImage = null;
		if ("png".equals(fileExtension.toLowerCase())) {
			newResizedImage = new BufferedImage(new_width, new_height, BufferedImage.TYPE_INT_ARGB);
		} else {
			newResizedImage = new BufferedImage(new_width, new_height, BufferedImage.TYPE_INT_RGB);
		}
		Graphics2D g = newResizedImage.createGraphics();

		// background transparent
		g.setComposite(AlphaComposite.Src);
		g.fillRect(0, 0, new_width, new_height);

		Map<RenderingHints.Key, Object> hints = new HashMap();
		hints.put(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		hints.put(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		hints.put(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g.addRenderingHints(hints);

		// puts the original image into the newResizedImage
		g.drawImage(originalImage, 0, 0, new_width, new_height, null);
		g.dispose();

		ImageIO.write(newResizedImage, fileExtension, target.toFile());
	}

}
